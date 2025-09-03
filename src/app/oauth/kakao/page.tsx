'use client';

import { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import Input from '@/components/common/Input';
import Button from '@/components/ui/Buttons';
import { cn } from '@/lib/utils';
import { oauthSignupSchema, OauthSignupValues } from '@/lib/validations/auth';

// ── 환경값
const BACKEND_REDIRECT_URI =
  process.env.NEXT_PUBLIC_BACKEND_KAKAO_REDIRECT_URI ??
  (typeof window !== 'undefined' ? `${window.location.origin}/oauth/kakao` : '/oauth/kakao');

const KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!; // 공개 가능

// ── API helpers
async function postJSON(url: string, body: unknown) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {}
  return { ok: res.ok, status: res.status, json, text };
}

export default function OauthSignupPage() {
  const { data: session, update, status } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectedOnce = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OauthSignupValues>({
    resolver: zodResolver(oauthSignupSchema),
    mode: 'onBlur',
  });

  // ✅ 이미 온보딩 끝났으면 홈으로
  useEffect(() => {
    if (status !== 'authenticated') return;
    if (session?.provider === 'kakao') {
      if (session?.accessToken || session?.needsOnboarding === false || session?.user?.nickname) {
        router.replace('/');
      }
    }
  }, [session, status, router]);

  // ✅ code가 있으면 백엔드 signIn/kakao로 "닉네임 존재/매핑 확인" → 있으면 자동 완료
  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;
    if (busy) return;
    if (status !== 'authenticated') return;

    (async () => {
      setBusy(true);
      setErrorMessage(null);

      // 스웨거: POST /{teamId}/auth/signIn/kakao  body: { redirectUri, token }
      const {
        ok,
        json,
        status: s,
      } = await postJSON(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auth/signIn/kakao`,
        { redirectUri: BACKEND_REDIRECT_URI, token: code },
      );

      if (ok && json?.user) {
        const hasNickname = !!json.user.nickname;
        // 세션 채우기
        await update({
          accessToken: json.accessToken,
          needsOnboarding: !hasNickname,
          user: {
            id: String(json.user.id),
            email: json.user.email,
            nickname: json.user.nickname ?? null,
            image: json.user.image ?? null,
            description: json.user.description ?? null,
          },
        });

        // URL 정리
        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', '/oauth/kakao');
        }

        // 닉네임 있으면 바로 홈
        if (hasNickname) {
          router.replace('/');
        }
      } else {
        // 실패면 폼 유지(닉네임 입력 진행)
        if (s === 400 && json?.message) setErrorMessage(json.message);
      }

      setBusy(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, status]);

  // ── fresh code 받으러 카카오로 이동
  const getFreshAuthorizationCode = (nickname: string) => {
    if (redirectedOnce.current) return;
    redirectedOnce.current = true;

    sessionStorage.setItem('pendingNickname', nickname);
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: KAKAO_CLIENT_ID,
      redirect_uri: BACKEND_REDIRECT_URI,
      scope: 'account_email profile_nickname',
    });
    window.location.href = `${KAKAO_AUTHORIZE_URL}?${params.toString()}`;
  };

  const onSubmit = async (data: OauthSignupValues) => {
    if (busy) return;
    setBusy(true);
    setErrorMessage(null);

    try {
      const code = searchParams.get('code');
      if (!code) {
        getFreshAuthorizationCode(data.nickname);
        return;
      }

      const nickname = data.nickname || sessionStorage.getItem('pendingNickname') || '';

      if (!nickname) {
        setErrorMessage('닉네임이 없습니다. 다시 입력해 주세요.');
        return;
      }

      // 1) signUp/kakao 시도
      const signUpRes = await postJSON(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auth/signUp/kakao`,
        { nickname, redirectUri: BACKEND_REDIRECT_URI, token: code },
      );

      // 1-1) 성공 → 세션 업데이트 후 홈
      if (signUpRes.ok && signUpRes.json?.user) {
        await update({
          accessToken: signUpRes.json.accessToken,
          needsOnboarding: false,
          user: {
            id: String(signUpRes.json.user.id),
            email: signUpRes.json.user.email,
            nickname: signUpRes.json.user.nickname ?? null,
            image: signUpRes.json.user.image ?? null,
            description: signUpRes.json.user.description ?? null,
          },
        });

        sessionStorage.removeItem('pendingNickname');
        window.history.replaceState(null, '', '/oauth/kakao');
        router.replace('/');
        return;
      }

      // 1-2) 400 & “이미 사용중인 닉네임” 등 → 2) signIn/kakao로 조회해서 닉네임 있으면 바로 완료
      if (signUpRes.status === 400 && typeof signUpRes.json?.message === 'string') {
        const signInRes = await postJSON(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auth/signIn/kakao`,
          { redirectUri: BACKEND_REDIRECT_URI, token: code },
        );

        if (signInRes.ok && signInRes.json?.user?.nickname) {
          await update({
            accessToken: signInRes.json.accessToken,
            needsOnboarding: false,
            user: {
              id: String(signInRes.json.user.id),
              email: signInRes.json.user.email,
              nickname: signInRes.json.user.nickname ?? null,
              image: signInRes.json.user.image ?? null,
              description: signInRes.json.user.description ?? null,
            },
          });

          sessionStorage.removeItem('pendingNickname');
          window.history.replaceState(null, '', '/oauth/kakao');
          router.replace('/');
          return;
        }

        // 그래도 닉네임이 없다면 메시지만 보여주고 폼 유지
        setErrorMessage(signUpRes.json.message);
        return;
      }

      // 기타 실패
      setErrorMessage(signUpRes.json?.message ?? signUpRes.text ?? '회원가입에 실패했습니다.');
    } catch (e) {
      console.error(e);
      setErrorMessage('알 수 없는 오류가 발생했습니다.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'm-auto flex flex-col',
        'h-screen',
        'w-[335px] md:w-[440px] xl:w-[640px]',
        'py-[30px] md:py-[181px] xl:py-[93px]',
        'gap-[60px]',
      )}
    >
      <Input
        type='text'
        label='닉네임'
        placeholder='닉네임을 입력해 주세요'
        errorMessage={errors.nickname?.message}
        {...register('nickname')}
        hintMessage='최대 10자 가능'
      />

      <div>
        <Button type='submit' className='shrink-0' disabled={isSubmitting || busy}>
          {isSubmitting || busy ? '가입 중...' : '가입하기'}
        </Button>
        {errorMessage && <p className='my-5 text-center text-sm text-red-500'>{errorMessage}</p>}
      </div>
    </form>
  );
}
