'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';

import { patchProfileInfo } from '@/actions/profile/patchProfileInfo';
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

  const {
    register,
    // control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'all',
  });

  const onSubmit = (data: ProfileFormValues) => {
    startTrainsition(async () => {
      try {
        await patchProfileInfo(data);
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
        {/* <Controller name='profile' control={control} render={({ field }) => <FileInput />} /> */}

        <Input
          placeholder='닉네임을 입력해주세요'
          {...register('nickname')}
          value={nickname}
          errorMessage={errors.nickname?.message}
        />

        {/* 요구사항엔 300자 시안에는 500자네요... */}
        <Textbox
          placeholder='자신을 소개하세요'
          {...register('description')}
          className='w-full'
          value={description}
          maxLength={300}
        />

        <Button className='my-5'>{isPending ? '저장 중...' : '저장하기'}</Button>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
