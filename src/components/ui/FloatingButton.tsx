'use client';

import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

import ProductModal from '@/app/_components/ProductPost/ProductModal';
import AddIcon from '@/assets/icon/Icon-floating.svg';
import { useModalStore } from '@/store/modalStore';

const FloatingButton = () => {
  const { data: session } = useSession();
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const openModal = useModalStore((state) => state.openModal);

  const handleClickModal = () => {
    return openModal({ component: ProductModal, props: { mode: 'create' } });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const footer = document.querySelector('footer');
      if (footer) {
        const observer = new IntersectionObserver(
          ([entry]) => setIsFooterVisible(entry.isIntersecting),
          { root: null, threshold: 0.1 },
        );
        observer.observe(footer);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!session) return null;

  return (
    <div
      className={`fixed right-10 z-50 transition-all xl:right-20 ${isFooterVisible ? 'bottom-30' : 'bottom-10 xl:bottom-20'}`}
    >
      <div className='group relative'>
        <div className='bg-white-f1f1f5 absolute -left-32 ml-auto hidden max-w-xs rounded-2xl px-3 py-2 text-gray-900 shadow group-hover:block'>
          영화 추가하기
          <span className='border-l-white-f1f1f5 absolute top-1/2 -right-[7px] -mt-1 h-0 w-0 border-y-8 border-b-0 border-l-8 border-y-transparent'></span>
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
    </div>
  );
};

export default FloatingButton;
