'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn as nextAuthSignIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { signIn } from '@/actions/auth';
import GithubIcon from '@/assets/icon/status=github.svg';
import GoogleIcon from '@/assets/icon/status=google.svg';
import KakaoIcon from '@/assets/icon/status=kakao.svg';
import Input from '@/components/common/Input';
import Button from '@/components/ui/Buttons';
import { cn } from '@/lib/utils';
import { LoginFormValues, signinSchema } from '@/lib/validations/auth';

const SigninPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(signinSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormValues) => {
    // 이전 에러 메시지 초기화
    setErrorMessage(null);

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    try {
      const result = await signIn(formData);

      // result.error가 존재하면 로그인 실패
      if (result?.error) {
        setErrorMessage(result.error);
        reset(); // 폼 필드 초기화
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setErrorMessage('알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'm-auto flex h-full flex-col justify-center gap-[60px]',
        'w-[335px] pt-[108px]',
        'md:w-[440px] md:py-[181px]',
        'xl:w-[640px] xl:py-[90px]',
      )}
    >
      <div className='flex flex-col gap-[30px] md:gap-10'>
        <Input
          type='email'
          label='이메일'
          placeholder='이메일을 입력해주세요'
          errorMessage={errors.email?.message}
          {...register('email')}
        />

        <Input
          type='password'
          label='비밀번호'
          placeholder='비밀번호를 입력해주세요'
          errorMessage={errors.password?.message}
          {...register('password')}
        />

        {/* 로그인 실패 시 에러 메시지 표시 */}
        {errorMessage && <p className='text-sm text-red-500'>{errorMessage}</p>}
      </div>

      <Button type='submit' disabled={isSubmitting}>
        {isSubmitting ? '로그인 중...' : '로그인'}
      </Button>

      <div className='flex flex-col gap-5'>
        <p className='text-gray-6e6e82 text-center'>SNS로 바로 시작히기</p>
        <div className='flex items-center justify-center gap-5'>
          <button
            onClick={() => nextAuthSignIn('google')}
            className='border-black-353542 rounded-full border p-[14px]'
          >
            <GoogleIcon className='h-full w-full' />
          </button>
          <button
            onClick={() => nextAuthSignIn('kakao')}
            className='border-black-353542 rounded-full border p-[14px]'
          >
            <KakaoIcon className='h-full w-full' />
          </button>
          <button
            onClick={() => nextAuthSignIn('github')}
            className='border-black-353542 rounded-full border p-[14px]'
          >
            <GithubIcon className='h-[24px] w-[24px] text-[#6e6e82]' />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SigninPage;
