'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { patchProfileInfo } from '@/actions/profile/patchProfileInfo';
import Input from '@/components/common/Input';
import Textbox from '@/components/common/Textbox';
import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';

// const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg'] as const;
// const MAX_FILE_SIZE = 2 * 1024 * 1024;

const profileSchema = z.object({
  nickname: z
    .string()
    .nonempty('닉네임은 필수 입력입니다.')
    .max(10, '닉네임은 최대 10자까지 가능합니다.'),
  description: z.string().max(300, '소개는 최대 300자까지 가능해요').optional(),
  // profile: z
  //   .instanceof(File)
  //   .optional()
  //   .refine((file) => !file || file.size <= MAX_FILE_SIZE, '파일 크기는 2MB를 넘을 수 없어요')
  //   .refine(
  //     (file) =>
  //       !file || ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number]),
  //     'PNG/JPEG만 업로드 가능해요',
  //   ),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileUpdateForm = () => {
  const { showBoundary } = useErrorBoundary();
  const [isPending, startTrainsition] = useTransition();

  const {
    register,
    // control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'all',
  });

  const close = useModalStore((state) => state.close);

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
          errorMessage={errors.nickname?.message}
        />

        {/* 요구사항엔 300자 시안에는 500자네요... */}
        <Textbox
          placeholder='자신을 소개하세요'
          {...register('description')}
          className='w-full'
          maxLength={300}
        />

        <Button className='my-5'>{isPending ? '저장 중...' : '저장하기'}</Button>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
