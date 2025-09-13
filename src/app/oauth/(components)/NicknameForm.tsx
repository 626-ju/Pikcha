'use client';

import React, { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import BicLogo from '@/components/common/BigLogo';
import Input from '@/components/common/Input';
import Button from '@/components/ui/Buttons';
import { oauthSignupSchema, type OauthSignupValues } from '@/lib/validations/auth';

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
    formState: { errors },
  } = useForm<OauthSignupValues>({
    resolver: zodResolver(oauthSignupSchema),
    mode: 'onBlur',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      setIsLoading(false);
    }
  }, [errorMessage]);

  const handleFormSubmit = async (values: OauthSignupValues) => {
    try {
      setIsLoading(true);
      await onSubmit(values);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <BicLogo />
      <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-10 px-5'>
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
          <Button type='submit' className='shrink-0' disabled={isLoading || isBusy}>
            {isLoading || isBusy ? '가입 중...' : '가입하기'}
          </Button>
        </div>
      </form>
    </div>
  );
};
