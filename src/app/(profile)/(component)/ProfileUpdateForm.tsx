'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';

import { patchProfileInfo } from '@/actions/profile/patchProfileInfo';
import FileInput from '@/components/common/FileInput';
import Input from '@/components/common/Input';
import Textbox from '@/components/common/Textbox';
import Button from '@/components/ui/Buttons';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import { useUserInfoStore } from '@/store/userInfoStore';
import { profileSchema, type ProfileFormValues } from '@/types/profile/profileUpdateSchema';

const ProfileUpdateForm = () => {
  const { update } = useSession();
  const closeModal = useModalStore((state) => state.closeModal);
  const [isLoading, setIsLoading] = useState(false);

  const nickname = useUserInfoStore((state) => state.nickname);
  const description = useUserInfoStore((state) => state.description);
  const image = useUserInfoStore((state) => state.image);

  const [err, setError] = useState(false);

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
        image === 'https://chipper-hummingbird-0e6d64.netlify.app/images/default-profile.png' ||
        image === null
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
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[10px]'>
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
          setError={setError}
          errorMessage={err ? ' ' : ''}
          className={err ? 'animate-shake' : ''}
        />

        <Textbox
          placeholder='자신을 소개하세요'
          maxLength={140}
          defaultValue={description}
          {...register('description')}
        />

        <div
          className={cn(
            'text-red-ff0000 relative flex flex-col items-center justify-start',
            'mt-[26px] md:mt-[30px]', //모바일 36px 태블릿 40px
          )}
        >
          <p className='text-mogazoa-14px-300 absolute top-[-20px]'>
            {err && '닉네임이 중복되었습니다'}
          </p>
          <Button disabled={!isDirty || isLoading || err} className={cn('mb-5')}>
            {isLoading ? '저장 중...' : '저장하기'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
