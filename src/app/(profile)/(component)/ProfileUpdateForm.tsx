'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useErrorBoundary } from 'react-error-boundary';
import { Controller, useForm } from 'react-hook-form';

import { patchProfileInfo } from '@/actions/profile/patchProfileInfo';
import FileInput from '@/components/common/FileInput';
import Input from '@/components/common/Input';
import Textbox from '@/components/common/Textbox';
import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';
import { useUserInfoStore } from '@/store/userInfoStore';
import { profileSchema, type ProfileFormValues } from '@/types/profile/profileUpdateSchema';

const ProfileUpdateForm = () => {
  const { showBoundary } = useErrorBoundary();
  const close = useModalStore((state) => state.close);
  const [isLoading, setIsLoading] = useState(false);

  const nickname = useUserInfoStore((state) => state.nickname);
  const description = useUserInfoStore((state) => state.description);
  const image = useUserInfoStore((state) => state.image);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'all',
    defaultValues: {
      nickname,
      description,
      image: [image],
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsLoading(true);
      await patchProfileInfo({
        nickname: data.nickname,
        description: data.description,
        image: data.image,
      });
      close();
    } catch (err) {
      showBoundary(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <Controller
          name='image'
          control={control}
          render={({ field }) => (
            <FileInput value={field.value ?? []} onChange={field.onChange} maxFiles={1} />
          )}
        />

        <Input
          placeholder='닉네임을 입력해주세요'
          {...register('nickname')}
          errorMessage={errors.nickname?.message}
        />

        {/* 요구사항엔 300자 시안에는 500자네요... */}
        <Textbox
          placeholder='자신을 소개하세요'
          {...register('description')}
          className='w-full'
          maxLength={300}
        />

        <Button disabled={!isDirty || isLoading} className='my-5'>
          {isLoading ? '저장 중...' : '저장하기'}
        </Button>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
