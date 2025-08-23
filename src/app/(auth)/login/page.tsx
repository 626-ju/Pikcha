'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import Input from '@/components/Input';
import { LoginFormValues, loginSchema } from '@/lib/validations/auth';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('폼 제출 데이터:', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='m-auto flex h-full w-[335px] flex-col justify-center gap-[60px] pt-[108px] md:w-[440px] md:py-[181px] xl:w-[640px] xl:py-[90px]'
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
      <button type='submit' className='border'>
        로그인
      </button>
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

export default LoginPage;
