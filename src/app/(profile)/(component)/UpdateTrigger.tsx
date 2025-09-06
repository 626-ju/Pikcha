'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';

import ProfileUpdateModal from './(modal)/ProfileUpdateModal';

const UpdateTrigger = () => {
  const openModal = useModalStore((state) => state.openModal);
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: false });
    router.push('/');
  };

  return (
    <div className='w-full'>
      <Button onClick={() => openModal({ component: ProfileUpdateModal })}>프로필 편집</Button>
      <Button variant='tertiary' onClick={handleLogout} className='mt-2.5 md:mt-[15px] xl:mt-5'>
        로그아웃
      </Button>
    </div>
  );
};

export default UpdateTrigger;
