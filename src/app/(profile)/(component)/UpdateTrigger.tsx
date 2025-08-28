'use client';

import React from 'react';

import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';

import ProfileUpdateModal from './(modal)/ProfileUpdateModal';

const UpdateTrigger = () => {
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
