'use client';
import React from 'react';

import ProductModal from '@/app/_components/ProductPost/ProductModal';
import AddIcon from '@/assets/icon/Icon-floating.svg';
import { useModalStore } from '@/store/modalStore';

const FloatingButton = () => {
  const openModal = useModalStore((state) => state.openModal);

  const handleClickModal = () => {
    return openModal({ component: ProductModal, props: 'create' });
  };
  return (
    <button
      type='button'
      className='to-main-indigo hover:indigo-300 fixed right-10 bottom-10 flex h-15 w-15 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-blue-500 text-8xl hover:bg-gradient-to-r hover:from-sky-400 hover:via-blue-400'
      onClick={handleClickModal}
    >
      <AddIcon />
    </button>
  );
};

export default FloatingButton;
