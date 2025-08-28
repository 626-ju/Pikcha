'use client';

import { useTransition } from 'react';

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
  const [isPending, startTrainsition] = useTransition();
  const close = useModalStore((state) => state.close);

  const nickname = useUserInfoStore((state) => state.nickname);
  const description = useUserInfoStore((state) => state.description);
  const image = useUserInfoStore((state) => state.image);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'all',
  });

  const onSubmit = (data: ProfileFormValues) => {
    startTrainsition(async () => {
      try {
        await patchProfileInfo({
          nickname: data.nickname,
          description: data.description,
          image: data.image,
        });
      } catch (err) {
        showBoundary(err);
      } finally {
        close();
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
        <Controller
          name='image'
          control={control}
          defaultValue={image ? [image] : []}
          render={({ field }) => (
            <FileInput value={field.value ?? []} onChange={field.onChange} maxFiles={1} />
          )}
        />

        <Input
          placeholder='닉네임을 입력해주세요'
          {...register('nickname')}
          defaultValue={nickname}
          errorMessage={errors.nickname?.message}
        />

        {/* 요구사항엔 300자 시안에는 500자네요... */}
        <Textbox
          placeholder='자신을 소개하세요'
          {...register('description')}
          className='w-full'
          defaultValue={description}
          maxLength={300}
        />

        <Button className='my-5'>{isPending ? '저장 중...' : '저장하기'}</Button>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
