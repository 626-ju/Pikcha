'use client';

import React from 'react';

import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';
import { useUserInfoStore } from '@/store/userInfoStore';
import { ProfileFormValues } from '@/types/profile/profileUpdateSchema';

import ProfileUpdateModal from './(modal)/ProfileUpdateModal';

const UpdateTrigger = ({ nickname, description }: ProfileFormValues) => {
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

  setUserInfo({ nickname, description });

  const open = useModalStore((state) => state.open);

  return (
    <div className='w-full'>
      <Button onClick={() => open({ component: ProfileUpdateModal })}>프로필 편집</Button>
      <Button variant='tertiary' className='mt-2.5 md:mt-[15px] xl:mt-5'>
        로그아웃
      </Button>
    </div>
  );
};

export default UpdateTrigger;
