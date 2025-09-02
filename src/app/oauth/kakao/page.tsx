'use client';

import { useState, useEffect } from 'react';

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
const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!; // 공개 가능

export default function OauthSignupPage() {
  const { data: session, update, status } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OauthSignupValues>({
    resolver: zodResolver(oauthSignupSchema),
    mode: 'onBlur',
  });

  // 새로고침/재방문 시에도: 백엔드 토큰이 이미 있으면 홈으로
  useEffect(() => {
    if (status === 'loading') return;
    if (session?.provider === 'kakao' && session.needsOnboarding === false) {
      router.replace('/');
    }
  }, [session, status, router]);

  // authorize 후 돌아왔을 때 자동 제출하고 싶으면 여기에 세션스토리지 값 체크해서 실행해도 됨
  useEffect(() => {
    const returnedCode = searchParams.get('code');
    const pendingNickname = sessionStorage.getItem('pendingNickname');
    if (returnedCode && pendingNickname) {
      // 자동 제출 트리거를 걸고 싶으면 여기서 호출 가능
      // 다만 예제에선 명시적 onSubmit에서 처리하도록 둠
    }
  }, [searchParams]);

  const getFreshAuthorizationCode = (nickname: string) => {
    // 닉네임을 리다이렉트 왕복 동안 보존
    sessionStorage.setItem('pendingNickname', nickname);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: KAKAO_CLIENT_ID,
      redirect_uri: BACKEND_REDIRECT_URI,
      scope: 'account_email profile_nickname',
      // state: 필요하면 사용 (복구 정보 등)
    });

    // 현재 페이지를 카카오로 보냈다가 다시 /oauth/kakao 로 돌아오게 함
    window.location.href = `${KAKAO_AUTHORIZE_URL}?${params.toString()}`;
  };

  const onSubmit = async (data: OauthSignupValues) => {
    setErrorMessage(null);

    // 1) fresh code가 없으면 먼저 받아오러 간다.
    const code = searchParams.get('code');
    if (!code) {
      getFreshAuthorizationCode(data.nickname);
      return; // 이후 흐름은 콜백으로 되돌아와서 계속됨
    }

    // 2) 돌아왔으면 닉네임 복구
    const nickname = data.nickname || sessionStorage.getItem('pendingNickname') || '';
    if (!nickname) {
      setErrorMessage('닉네임이 없습니다. 다시 입력해 주세요.');
      return;
    }

    // 3) 백엔드로 가입 요청 (백엔드는 "토큰" 자리에 인가코드만 받음)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auth/signUp/kakao`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nickname,
            redirectUri: BACKEND_REDIRECT_URI, // 반드시 authorize 때 사용한 redirect_uri와 동일
            token: code, // ← fresh code 사용
          }),
        },
      );

      const text = await res.text();
      const json = text ? JSON.parse(text) : null;

      if (!res.ok) {
        setErrorMessage(json?.message ?? text ?? '회원가입에 실패했습니다.');
        return;
      }

      // 4) 백엔드 토큰/유저정보 세션에 반영 → 온보딩 종료
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

      // 5) 사용한 임시 데이터 정리
      sessionStorage.removeItem('pendingNickname');

      router.replace('/');
    } catch (err) {
      console.error(err);
      setErrorMessage('알 수 없는 오류가 발생했습니다.');
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
        <Button type='submit' className='shrink-0' disabled={isSubmitting}>
          {isSubmitting ? '가입 중...' : '가입하기'}
        </Button>
        {errorMessage && <p className='my-5 text-center text-sm text-red-500'>{errorMessage}</p>}
      </div>
    </form>
  );
}
