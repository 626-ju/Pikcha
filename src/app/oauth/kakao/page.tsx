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

const BACKEND_REDIRECT_URI =
  process.env.NEXT_PUBLIC_BACKEND_KAKAO_REDIRECT_URI ??
  (typeof window !== 'undefined' ? `${window.location.origin}/oauth/kakao` : '/oauth/kakao');

const KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;

type Phase = 'probing' | 'form' | 'redirecting';

export default function OauthSignupPage() {
  const { data: session, update, status } = useSession();
  const [phase, setPhase] = useState<Phase>('probing'); // ← 최초엔 항상 “확인 중”
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const preflightOnce = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OauthSignupValues>({
    resolver: zodResolver(oauthSignupSchema),
    mode: 'onBlur',
  });

  const beginAuthorize = () => {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: KAKAO_CLIENT_ID,
      redirect_uri: BACKEND_REDIRECT_URI,
      scope: 'account_email profile_nickname',
    });
    window.location.href = `${KAKAO_AUTHORIZE_URL}?${params.toString()}`;
  };

  // ✅ 진입 즉시: 기존 사용자면 스킵, 신규면 폼. UI는 끝날 때까지 “확인 중” 유지
  useEffect(() => {
    if (preflightOnce.current) return;
    if (status === 'loading') return;
    if (session?.provider !== 'kakao') return; // 카카오 플로우가 아니면 건너뜀

    // 이미 온보딩이 끝났거나 accessToken 있으면 즉시 홈
    if (session?.needsOnboarding === false || session?.accessToken) {
      preflightOnce.current = true;
      setPhase('redirecting');
      router.replace('/');
      setTimeout(() => {
        if (location.pathname !== '/') window.location.assign('/');
      }, 100);
      return;
    }

    // 새로 preflight 실행
    preflightOnce.current = true;
    setPhase('probing');

    (async () => {
      try {
        const code = searchParams.get('code');
        if (!code) {
          // fresh code 필요 → 바로 카카오로 이동
          beginAuthorize();
          return;
        }

        // 간편 로그인으로 “기존 가입자 여부” 판별
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auth/signIn/kakao`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ redirectUri: BACKEND_REDIRECT_URI, token: code }),
          },
        );

        const text = await res.text();
        const json = text ? JSON.parse(text) : null;

        // URL 정리 (루프 방지)
        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', '/oauth/kakao');
        }

        if (res.ok && json?.user?.nickname) {
          // 기존 사용자 → 세션 업데이트 후 홈
          await update({
            accessToken: json.accessToken,
            needsOnboarding: false,
            user: {
              id: String(json.user.id),
              email: json.user.email,
              nickname: json.user.nickname,
              image: json.user.image,
              description: json.user.description,
            },
          });
          setPhase('redirecting');
          router.replace('/');
          setTimeout(() => {
            if (location.pathname !== '/') window.location.assign('/');
          }, 100);
          return;
        }

        // 신규 사용자 → 폼 오픈
        setPhase('form');
      } catch (e) {
        console.error('[preflight] error', e);
        // 실패해도 폼은 오픈해서 진행 가능
        setPhase('form');
      }
    })();
  }, [status, session, searchParams, router, update]);

  // 신규 가입 제출
  const onSubmit = async (data: OauthSignupValues) => {
    if (busy) return;
    setBusy(true);
    setErrorMessage(null);

    try {
      const code = searchParams.get('code');
      if (!code) {
        beginAuthorize();
        return;
      }

      const nickname = data.nickname?.trim();
      if (!nickname) {
        setErrorMessage('닉네임을 입력해 주세요.');
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auth/signUp/kakao`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nickname, redirectUri: BACKEND_REDIRECT_URI, token: code }),
        },
      );

      const text = await res.text();
      const json = text ? JSON.parse(text) : null;

      if (!res.ok) {
        setErrorMessage(json?.message ?? text ?? '회원가입에 실패했습니다.');
        return;
      }

      await update({
        accessToken: json.accessToken,
        needsOnboarding: false,
        user: {
          id: String(json.user.id),
          email: json.user.email,
          nickname: json.user.nickname,
          image: json.user.image,
          description: json.user.description,
        },
      });

      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', '/oauth/kakao');
      }
      setPhase('redirecting');
      router.replace('/');
      setTimeout(() => {
        if (location.pathname !== '/') window.location.assign('/');
      }, 100);
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
      {phase !== 'form' ? (
        <p className='text-center text-sm text-gray-500'>카카오 계정 확인 중…</p>
      ) : (
        <>
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
            {errorMessage && (
              <p className='my-5 text-center text-sm text-red-500'>{errorMessage}</p>
            )}
          </div>
        </>
      )}
    </form>
  );
}
