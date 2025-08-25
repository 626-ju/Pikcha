'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import Input from '@/components/Input';
import Button from '@/components/ui/Buttons';
import { cn } from '@/lib/utils';
import { LoginFormValues, singinSchema } from '@/lib/validations/auth';

const SigninPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(singinSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);
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
