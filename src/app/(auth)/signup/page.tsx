'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Input from '@/components/Input';
import { LoginFormValues, loginSchema } from '@/lib/validations/auth';

const SignupPage = () => {
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
      className='m-auto flex h-screen w-[335px] flex-col py-[30px] md:w-[440px] md:gap-[60px] md:py-[181px] xl:w-[640px] xl:py-[93px]'
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
          type='text'
          label='닉네임'
          placeholder='닉네임을 입력해주세요'
          errorMessage={errors.nickname?.message}
          {...register('nickname')}
        />

        <Input
          type='password'
          label='비밀번호'
          placeholder='비밀번호를 입력해주세요'
          errorMessage={errors.password?.message}
          {...register('password')}
        />

        <Input
          type='password'
          label='비밀번호 확인'
          placeholder='비밀번호를 한번 더 입력해주세요'
          errorMessage={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </div>

      <button type='submit' className='mt-auto border md:mt-0'>
        가입하기
      </button>
    </form>
  );
};

export default SignupPage;
