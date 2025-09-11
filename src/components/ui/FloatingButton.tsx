'use client';

import React, { useEffect, useState } from 'react';

import { Moon, Sun } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';

import ProductModal from '@/app/_components/ProductPost/ProductModal';
import AddIcon from '@/assets/icon/Icon-floating.svg';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';

const FloatingButton = () => {
  const [mounted, setMounted] = useState(false); // SSR 깜빡임 방지
  const { resolvedTheme, setTheme } = useTheme(); // enableSystem=false면 theme===resolvedTheme
  const { data: session } = useSession();
  const openModal = useModalStore((state) => state.openModal);

  useEffect(() => setMounted(true), []);

  const handleClickModal = () => {
    return openModal({ component: ProductModal, props: { mode: 'create' } });
  };

  const isDark = resolvedTheme === 'dark'; // 현재 적용 테마 판별

  return (
    <div className='fixed right-5 bottom-10 z-50 flex shrink-0 flex-col gap-4'>
      {/* 테마 변경 버튼 */}
      {mounted && (
        <div className='group/theme flex items-center gap-4'>
          <div
            className={cn(
              'bg-white-f1f1f5 rounded-2xl text-gray-900 shadow group-hover/theme:block',
              'absolute -left-45 ml-auto hidden max-w-xs px-3 py-2',
            )}
          >
            {isDark ? 'Change LightMode' : 'Change DarkMode'}
            <span
              className={cn(
                'border-l-white-f1f1f5 border-y-8 border-b-0 border-l-8 border-y-transparent',
                'absolute top-1/2 -right-[7px] -mt-1 h-0 w-0',
              )}
            ></span>
          </div>
          <button
            type='button'
            onClick={() => setTheme(isDark ? 'light' : 'dark')} // 라이트↔다크 전환
            aria-pressed={isDark}
            data-theme-applied={resolvedTheme} // 스타일 확장용 data-attr
            className={cn(
              'inline-flex h-15 w-15 items-center justify-center rounded-full',
              'transition focus:outline-none',
              'border border-transparent',
              'light:bg-orange-500 light:hover:bg-orange-400 bg-indigo-800 text-white hover:bg-indigo-700',
            )}
          >
            {isDark ? (
              <Moon /> // 다크 아이콘
            ) : (
              <Sun /> // 라이트 아이콘
            )}
            <span className='sr-only'>{isDark ? '다크 → 라이트' : '라이트 → 다크'}</span>
          </button>
        </div>
      )}

      {/* 영화 추가버튼 */}
      {session && (
        <div className='group/add flex items-center gap-4'>
          <div className='bg-white-f1f1f5 absolute -left-32 ml-auto hidden max-w-xs rounded-2xl px-3 py-2 text-gray-900 shadow group-hover/add:block'>
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
      )}
    </div>
  );
};

export default FloatingButton;
