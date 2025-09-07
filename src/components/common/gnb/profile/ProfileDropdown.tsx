'use client';

import { useRef, useState } from 'react';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useCompareStore } from '@/store/compareStore';

import AvatarProfile from './AvatarProfile';

import type { Session } from 'next-auth';

interface ProfileDropdownProps {
  session: Session | null;
}

const ProfileDropdown = ({ session }: ProfileDropdownProps) => {
  const [listOpen, setListOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const compareList = useCompareStore();
  const clearCompareList = compareList.clearCompareList;

  useOnClickOutside(containerRef, () => {
    setListOpen(false);
  });

  return (
    <div
      ref={containerRef}
      className='relative flex h-[70px] items-center px-2 md:h-[80px] xl:h-[100px]'
    >
      <button
        type='button'
        aria-haspopup='menu'
        aria-expanded={listOpen}
        onClick={() => setListOpen((open) => !open)}
        className='cursor-pointer'
      >
        <AvatarProfile profileImg={session?.user?.image} userName={session?.user?.nickname} />
      </button>
      {listOpen && (
        <div
          role='menu'
          className='border-black-353542 bg-black-252530 absolute top-20 right-0 z-10 w-32 rounded-lg border px-2 py-2'
        >
          <ul>
            <li className='hover:bg-black-353542 text-white-f1f1f5 rounded-lg'>
              <Link href='/mypage' onClick={() => setListOpen(false)} className='block px-2 py-1'>
                내 프로필
              </Link>
            </li>
            <li className='hover:bg-black-353542 text-white-f1f1f5 rounded-lg'>
              <button
                onClick={() => {
                  setListOpen(false);
                  clearCompareList();
                  signOut();
                }}
                className='w-full px-2 py-1 text-left'
              >
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
