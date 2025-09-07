'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
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
  const { update } = useSession();
  const closeModal = useModalStore((state) => state.closeModal);
  const [isLoading, setIsLoading] = useState(false);

  const nickname = useUserInfoStore((state) => state.nickname);
  const description = useUserInfoStore((state) => state.description);
  const image = useUserInfoStore((state) => state.image);

  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onBlur',
    defaultValues: {
      nickname,
      description,
      image:
        image === 'https://chipper-hummingbird-0e6d64.netlify.app/images/default-profile.png'
          ? undefined
          : [image],
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

      // 세션 업데이트하여 헤더 프로필에 즉시 반영
      await update({
        user: {
          nickname: data.nickname,
          image: data.image?.[0] || null,
        },
      });

      closeModal();
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
            <FileInput maxFiles={1} value={field.value ?? []} onChange={field.onChange} />
          )}
        />

        <Input
          placeholder='닉네임을 입력해주세요'
          maxLength={10}
          defaultValue={nickname}
          {...register('nickname')}
        />

        <Textbox
          placeholder='자신을 소개하세요'
          maxLength={140}
          defaultValue={description}
          {...register('description')}
        />

        <Button disabled={!isDirty || isLoading} className='my-5'>
          {isLoading ? '저장 중...' : '저장하기'}
        </Button>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
