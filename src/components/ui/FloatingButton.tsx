'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import ProductModal from '@/app/_components/ProductPost/ProductModal';
import AddIcon from '@/assets/icon/Icon-floating.svg';
import ScrollTopIcon from '@/assets/icon/Icon-scrollTop.svg';
import { useModalStore } from '@/store/modalStore';

const FloatingButton = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { data: session } = useSession();
  const openModal = useModalStore((state) => state.openModal);

  const handleClickModal = () => {
    return openModal({ component: ProductModal, props: { mode: 'create' } });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='fixed right-10 bottom-10 z-50 flex flex-col transition-all xl:right-20 xl:bottom-20'>
      {isVisible && (
        <div
          onClick={scrollTop}
          className='bg-gray-9fa6b2 hover:bg-gray-6e6e82 mb-4 flex h-15 w-15 cursor-pointer items-center justify-center rounded-full pt-1 transition-colors duration-200 hover:opacity-100'
        >
          <ScrollTopIcon className='h-10 w-10' />
        </div>
      )}

      {session && (
        <div className='group relative h-15 w-15'>
          <button
            type='button'
            aria-label='영화 추가하기'
            className='to-main-indigo hover:indigo-300 mr-[-20px] flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-blue-500 text-8xl hover:bg-gradient-to-r hover:from-sky-400 hover:via-blue-400'
            onClick={handleClickModal}
          >
            <AddIcon />
          </button>
          <div className='bg-white-f1f1f5 absolute top-2 -left-32 ml-auto hidden max-w-xs rounded-2xl px-3 py-2 text-gray-900 shadow group-hover:block'>
            영화 추가하기
            <span className='border-l-white-f1f1f5 absolute top-1/2 -right-[7px] -mt-1 h-0 w-0 border-y-8 border-b-0 border-l-8 border-y-transparent'></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
