'use client';

import { useState, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import Input from '@/components/common/Input';
import Button from '@/components/ui/Buttons';
import { cn } from '@/lib/utils';
import { oauthSignupSchema, OauthSignupValues } from '@/lib/validations/auth';

const BACKEND_REDIRECT_URI =
  process.env.NEXT_PUBLIC_BACKEND_KAKAO_REDIRECT_URI ??
  (typeof window !== 'undefined' ? `${window.location.origin}/oauth/kakao` : '/oauth/kakao'); // 서버가 기대하는 redirectUri

export default function OauthSignupPage() {
  const { data: session, update, status } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OauthSignupValues>({
    resolver: zodResolver(oauthSignupSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (status === 'loading') return;
    // 카카오 로그인 사용자인데 온보딩 필요가 없으면 홈으로
    if (session?.provider === 'kakao' && session.needsOnboarding === false) {
      router.replace('/');
    }
  }, [session, status, router]);

  const onSubmit = async (data: OauthSignupValues) => {
    setErrorMessage(null);

    // ✅ 세션에서 카카오 access_token 사용
    const providerToken = session?.providerToken as string | undefined;
    if (!providerToken) {
      setErrorMessage('카카오 인증 값이 없습니다.');
      return;
    }

    const requestBody = {
      nickname: data.nickname,
      redirectUri: BACKEND_REDIRECT_URI,
      token: providerToken, // ← 이제 access_token을 넘김
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auth/signUp/kakao`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      },
    );

    const text = await res.text();
    const json = text ? JSON.parse(text) : null;

    if (!res.ok) {
      setErrorMessage(json?.message ?? text ?? '회원가입에 실패했습니다.');
      return;
    }

    // ✅ 백엔드 토큰을 세션에 반영 → needsOnboarding 자동 false
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

    router.replace('/');
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
