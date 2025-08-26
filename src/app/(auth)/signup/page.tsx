'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Input from '@/components/common/Input';
import Button from '@/components/ui/Buttons';
import { cn } from '@/lib/utils';
import { SignupFormValues, signupSchema } from '@/lib/validations/auth';

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
  });

  const onSubmit = (data: SignupFormValues) => {
    console.log('폼 제출 데이터:', data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'm-auto flex flex-col justify-between md:justify-start',
        'h-screen',
        'w-[335px] md:w-[440px] xl:w-[640px]',
        'py-[30px] md:py-[181px] xl:py-[93px]',
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

      <Button className='shrink-0'>가입하기</Button>
    </form>
  );
};

export default SignupPage;
