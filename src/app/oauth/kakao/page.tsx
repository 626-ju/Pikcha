'use client';

import { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { assertBackendMapping } from '@/actions/debug';
import Input from '@/components/common/Input';
import Button from '@/components/ui/Buttons';
import { cn } from '@/lib/utils';
import { oauthSignupSchema, OauthSignupValues } from '@/lib/validations/auth';

const BACKEND_REDIRECT_URI =
  process.env.NEXT_PUBLIC_BACKEND_KAKAO_REDIRECT_URI ??
  (typeof window !== 'undefined' ? `${window.location.origin}/oauth/kakao` : '/oauth/kakao');

const KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;

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

  // 이미 온보딩 끝났으면 즉시 홈으로
  useEffect(() => {
    if (status !== 'authenticated') return;
    if (session?.provider === 'kakao') {
      const hasBackendToken = Boolean(session?.accessToken);
      const onboardDone = session?.needsOnboarding === false;
      if (hasBackendToken || onboardDone) {
        console.log('🔁 [guard] already onboarded → /');
        router.replace('/');
      }
    }
  }, [session, status, router]);

  const getFreshAuthorizationCode = (nickname: string) => {
    if (redirectedOnce.current) return;
    redirectedOnce.current = true;

    sessionStorage.setItem('pendingNickname', nickname);
    sessionStorage.setItem('oauthRedirecting', '1');

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: KAKAO_CLIENT_ID,
      redirect_uri: BACKEND_REDIRECT_URI,
      scope: 'account_email profile_nickname',
    });

    const url = `${KAKAO_AUTHORIZE_URL}?${params.toString()}`;
    console.log('➡️ [authorize] go:', url);
    window.location.href = url;
  };

  const onSubmit = async (data: OauthSignupValues) => {
    if (busy) return;
    setBusy(true);
    setErrorMessage(null);

    try {
      console.log('▶️ [submit] start');

      // 카카오가 반환한 에러 쿼리
      const kakaoErr = searchParams.get('error');
      const kakaoDesc = searchParams.get('error_description');
      if (kakaoErr) {
        console.log('⛔ [submit] kakao error:', kakaoErr, kakaoDesc);
        setErrorMessage(`카카오 인증 오류: ${kakaoDesc ?? kakaoErr}`);
        return;
      }

      // fresh code 필요 시 먼저 받으러 감
      const code = searchParams.get('code');
      if (!code) {
        console.log('ℹ️ [submit] no code → authorize');
        getFreshAuthorizationCode(data.nickname);
        return;
      }

      // 중복 코드 사용 방지
      const codeConsumedKey = `kakao_code_consumed:${code}`;
      if (sessionStorage.getItem(codeConsumedKey) === '1') {
        console.log('ℹ️ [submit] code already consumed → cleanup & go home');
        window.history.replaceState(null, '', '/oauth/kakao');
        window.location.replace('/');
        return;
      }

      // 닉네임
      const nickname = data.nickname || sessionStorage.getItem('pendingNickname') || '';
      if (!nickname) {
        console.log('⛔ [submit] no nickname');
        setErrorMessage('닉네임이 없습니다. 다시 입력해 주세요.');
        return;
      }

      console.log('🌐 [submit] call backend signUp/kakao', {
        nickname,
        redirectUri: BACKEND_REDIRECT_URI,
        code,
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auth/signUp/kakao`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nickname,
            redirectUri: BACKEND_REDIRECT_URI,
            token: code, // fresh code
          }),
        },
      );

      const text = await res.text();
      let json = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        // 빈 본문/비 JSON 방어
      }
      console.log('🌐 [submit] backend res:', res.status, json);

      if (!res.ok) {
        setErrorMessage(json?.message ?? text ?? '회원가입에 실패했습니다.');
        return;
      }

      if (!json?.accessToken || !json?.user) {
        setErrorMessage('가입은 되었지만 토큰 또는 사용자 정보가 누락되었습니다.');
        return;
      }

      // 세션 업데이트
      console.log('🟢 [submit] update() with user/token');
      const updated = await update({
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
      console.log('🟢 [submit] update() done:', updated);

      // 디버그/검증은 비동기로 날리고 기다리지 않음 (리다이렉트 블락 방지)
      // 실패해도 무시
      void assertBackendMapping('after-update').catch(() => {});

      // 코드/임시값 정리
      sessionStorage.setItem(codeConsumedKey, '1');
      sessionStorage.removeItem('pendingNickname');
      sessionStorage.removeItem('oauthRedirecting');
      window.history.replaceState(null, '', '/oauth/kakao');

      // 리다이렉트 (SSR 헤더 최신 세션 반영 위해 하드 리로드까지)
      console.log('➡️ [submit] redirect to /');
      router.replace('/');
      window.location.replace('/'); // 폴백/보장
    } catch (err) {
      console.error('❌ [submit] unexpected error', err);
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
