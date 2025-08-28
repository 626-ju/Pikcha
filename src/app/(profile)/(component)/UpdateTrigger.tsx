'use client';

import React from 'react';

import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';
import { useUserInfoStore } from '@/store/userInfoStore';

import ProfileUpdateModal from './(modal)/ProfileUpdateModal';

interface Props {
  nickname: string;
  description: string;
  image: string;
}

const UpdateTrigger = ({ nickname, description, image }: Props) => {
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

  setUserInfo({ nickname, description, image });

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
