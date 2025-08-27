'use client';

import { useState } from 'react';

import { Menu, X } from 'lucide-react';

import MobileMenuList from './MobileMenuList';

interface AuthState {
  isLoggedIn: boolean;
  name?: string | null;
  profileUrl?: string | null;
}

function useAuth(): AuthState {
  // const isLoggedIn = useAuthStore((s) => Boolean(s.session));
  // const name = useAuthStore((s) => s.user?.name ?? null);
  // const profileUrl = useAuthStore((s) => s.user?.profileImg ?? null);
  // return { isLoggedIn, name, profileUrl };

  return { isLoggedIn: true, name: null, profileUrl: null }; // 임시 더미데이터 -> profileDropdown.tsx과 동일한 코드. 훅으로 만들 것 고려
}

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, name, profileUrl } = useAuth();

  // const user = useAuthStore((s) => s.user); -> AvatarProfile로 유저 정보 내려줌

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
