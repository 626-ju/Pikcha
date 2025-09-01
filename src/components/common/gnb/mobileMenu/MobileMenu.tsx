'use client';

import { useState } from 'react';

import { Menu, X } from 'lucide-react';
import { useSession } from 'next-auth/react';

import MobileMenuList from './MobileMenuList';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const isLoggedIn = !!session;
  const name = session?.user?.nickname ?? null;
  const profileUrl = session?.user?.image ?? null;

  return (
    <div>
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label='모바일 메뉴 열기/닫기'
        className='cursor-pointer'
      >
        <Menu />
      </button>
      {isOpen && (
        <>
          {/* 오버레이 */}
          <div
            className='fixed top-[70px] right-0 bottom-0 left-0 z-40 bg-black/50'
            onClick={() => setIsOpen(false)}
          />
          {/* 사이드 메뉴 */}
          <aside className='bg-black-252530 animate-in slide-in-from-left fixed top-[70px] bottom-0 left-0 z-50 w-80 duration-300 ease-out'>
            {/* X 버튼 */}
            <div className='flex justify-end p-4'>
              <button
                onClick={() => setIsOpen(false)}
                aria-label='메뉴 닫기'
                className='text-white-f1f1f5 hover:text-gray-9fa6b2 cursor-pointer'
              >
                <X size={24} />
              </button>
            </div>
            {/* 메뉴 내용 */}
            <div className='px-4'>
              <MobileMenuList
                isLoggedIn={isLoggedIn}
                name={name}
                profileUrl={profileUrl}
                onClose={() => setIsOpen(false)}
              />
            </div>
          </aside>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
