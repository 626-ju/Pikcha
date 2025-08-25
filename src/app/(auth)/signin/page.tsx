'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import Input from '@/components/Input';
import Button from '@/components/ui/Buttons';
import { cn } from '@/lib/utils';
import { LoginFormValues, singinSchema } from '@/lib/validations/auth';

import { signIn } from '@/actions/auth';

const SigninPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(singinSchema),
    mode: 'onTouched',
  });

  const [serverError, setServerError] = useState<string | null>(null); // <-- 서버 에러 상태

  const onSubmit = async (data: LoginFormValues) => {
    // 폼 유효성 검사 통과 후 서버 액션 호출
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    // 서버 액션 호출 및 에러 처리
    const result = await signIn(formData);

    if (result && result.error) {
      // 서버에서 에러가 반환되면 상태에 저장
      setServerError(result.error);
    } else {
      // 성공 시 에러 상태 초기화 (성공 후 redirect 될 것이므로 사실 필요 없을 수도 있음)
      setServerError(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'm-auto flex h-full flex-col justify-center gap-[60px]', // 레이아웃
        'w-[335px] pt-[108px]', // 크기
        'md:w-[440px] md:py-[181px]', // md 반응형
        'xl:w-[640px] xl:py-[90px]', // xl 반응형
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

        {/* 서버 에러 메시지 표시 */}
        {serverError && <p className='mt-2 text-sm text-red-500'>{serverError}</p>}
      </div>

      <Button type='submit' disabled={isSubmitting}>
        {isSubmitting ? '로그인 중...' : '로그인'}
      </Button>

      <div className='flex flex-col gap-5'>
        <Link href='/'>
          <p className='text-gray-6e6e82 text-center'>SNS로 바로 시작히기</p>
        </Link>

        <div className='flex items-center justify-center gap-5'>
          <Image
            src='/images/status=google.svg'
            alt='구글 간편로그인'
            width={56}
            height={56}
            className='border-black-353542 rounded-full border p-[14px]'
          />
          <Image
            src='/images/status=kakao.svg'
            alt='카카오 간편로그인'
            width={56}
            height={56}
            className='border-black-353542 rounded-full border p-[14px]'
          />
        </div>
      </div>
    </form>
  );
};

export default SigninPage;
