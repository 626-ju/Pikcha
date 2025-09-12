'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn as nextAuthSignIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { signUp } from '@/actions/auth';
import Input from '@/components/common/Input';
import Button from '@/components/ui/Buttons';
import { cn } from '@/lib/utils';
import { SignupFormValues, signupSchema } from '@/lib/validations/auth';

/** 회원가입 입력 폼 */
const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('nickname', data.nickname);
    formData.append('passwordConfirmation', data.confirmPassword);

    try {
      const result = await signUp(formData);
      if (result.success) {
        await nextAuthSignIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        router.replace(result.redirectTo);
        return;
      }
      toast.error(result.error ?? '회원가입에 실패했습니다.');
      setIsLoading(false);
    } catch {
      toast.error('알 수 없는 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'm-auto flex flex-col justify-between md:justify-start',
        'h-screen',
        'w-[335px] md:w-[440px] xl:w-[640px]',
        'py-5',
        'md:gap-[60px]',
      )}
    >
      <div className={cn('flex flex-col', 'gap-[30px] md:gap-10')}>
        <Input
          type='email'
          label='이메일'
          placeholder='이메일을 입력해주세요'
          errorMessage={errors.email?.message}
          {...register('email')}
          hintMessage=''
        />

        <Input
          type='text'
          label='닉네임'
          placeholder='닉네임을 입력해주세요'
          errorMessage={errors.nickname?.message}
          {...register('nickname')}
          hintMessage='최대 10자 가능'
        />

        <Input
          type='password'
          label='비밀번호'
          placeholder='비밀번호를 입력해주세요'
          errorMessage={errors.password?.message}
          {...register('password')}
          hintMessage='최소 8자 이상'
        />

        <Input
          type='password'
          label='비밀번호 확인'
          placeholder='비밀번호를 한번 더 입력해주세요'
          errorMessage={errors.confirmPassword?.message}
          {...register('confirmPassword')}
          hintMessage=''
        />
      </div>

      <div>
        <Button className='shrink-0' disabled={isLoading}>
          {isLoading ? '가입 중...' : '가입하기'}
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
