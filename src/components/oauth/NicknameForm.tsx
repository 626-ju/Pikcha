'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Input from '@/components/common/Input';
import Button from '@/components/ui/Buttons';
import { oauthSignupSchema, OauthSignupValues } from '@/lib/validations/auth';

type Props = {
  onSubmit: (values: OauthSignupValues) => Promise<void> | void;
  isBusy?: boolean;
  errorMessage?: string | null;
};

/** 신규 가입 닉네임 폼 */
export const NicknameForm = ({ onSubmit, isBusy, errorMessage }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OauthSignupValues>({
    resolver: zodResolver(oauthSignupSchema),
    mode: 'onBlur',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10 space-y-5'>
      <Input
        type='text'
        label='닉네임'
        placeholder='닉네임을 입력해 주세요'
        errorMessage={errors.nickname?.message}
        {...register('nickname')}
        hintMessage='최대 10자 가능'
        maxLength={10}
      />
      <div>
        <Button type='submit' className='shrink-0' disabled={isSubmitting || isBusy}>
          {isSubmitting || isBusy ? '가입 중...' : '가입하기'}
        </Button>
        {errorMessage && <p className='text-center text-sm text-red-500'>{errorMessage}</p>}
      </div>
    </form>
  );
};
