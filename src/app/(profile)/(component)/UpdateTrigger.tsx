'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import Button from '@/components/ui/Buttons';
import { useCompareStore } from '@/store/compareStore';
import { useModalStore } from '@/store/modalStore';

import ProfileUpdateModal from './(modal)/ProfileUpdateModal';

const UpdateTrigger = () => {
  const openModal = useModalStore((state) => state.openModal);
  const { clearCompareList } = useCompareStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 1) 비교 목록 초기화
      clearCompareList();
      // 2) 세션 로그아웃 (클라이언트 리다이렉트는 우리가 처리)
      await signOut({ redirect: false });
      // 3) 홈으로 이동
      router.push('/');
    } catch {
      // 실패해도 최소한 홈으로 이동
      router.push('/');
    }
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
