'use client';
import React from 'react';

import { useSession } from 'next-auth/react';

import ProductModal from '@/app/_components/ProductPost/ProductModal';
import AddIcon from '@/assets/icon/Icon-floating.svg';
import { useModalStore } from '@/store/modalStore';

const FloatingButton = () => {
  const { data: session } = useSession();
  const openModal = useModalStore((state) => state.openModal);

  const handleClickModal = () => {
    return openModal({ component: ProductModal, props: { mode: 'create' } });
  };

  if (!session) return null;

  return (
    <div className='group fixed right-10 bottom-10 flex items-center gap-4'>
      <div className='bg-white-f1f1f5 relative ml-auto hidden max-w-xs rounded-2xl px-3 py-2 text-gray-900 shadow group-hover:block'>
        상품 추가하기
        <span className='border-l-white-f1f1f5 absolute top-1/2 -right-2 -mt-1 h-0 w-0 border-y-8 border-b-0 border-l-8 border-y-transparent'></span>
      </div>
      <button
        type='button'
        aria-label='영화 추가하기'
        className='to-main-indigo hover:indigo-300 mr-[-20px] flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-blue-500 text-8xl hover:bg-gradient-to-r hover:from-sky-400 hover:via-blue-400'
        onClick={handleClickModal}
      >
        <AddIcon />
      </button>
    </div>
  );
};

export default FloatingButton;
