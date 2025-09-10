'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn as nextAuthSignIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { signIn } from '@/actions/auth';
import Input from '@/components/common/Input';
import Button from '@/components/ui/Buttons';
import { cn } from '@/lib/utils';
import { LoginFormValues, signinSchema } from '@/lib/validations/auth';

/** 로그인 입력 폼 */
const SigninForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(signinSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMessage(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    const result = await signIn(formData);

    if (result.success) {
      await nextAuthSignIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      // 성공 시 바로 페이지 이동
      router.replace(result.redirectTo);
      return;
    }

    // 실패했을 때만 다시 로딩 해제
    setErrorMessage(result.error);
    setIsLoading(false);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'm-auto flex h-full flex-col justify-center gap-[60px]',
        'w=[335px] pt-[108px] pb-5',
        'md:w-[440px] md:pt-[181px]',
        'xl:w-[640px] xl:pt-[90px]',
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
      </div>

      <Button type='submit' disabled={isLoading}>
        {isLoading ? '로그인 중...' : '로그인'}
      </Button>

      {errorMessage && <p className='text-center text-sm text-red-500'>{errorMessage}</p>}
    </form>
  );
};

export default SigninForm;
