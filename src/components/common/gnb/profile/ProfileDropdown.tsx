'use client';

import { useRef, useState } from 'react';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

import AvatarProfile from './AvatarProfile';

import type { Session } from 'next-auth';

interface ProfileDropdownProps {
  session: Session | null;
}

const ProfileDropdown = ({ session }: ProfileDropdownProps) => {
  const [listOpen, setListOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, () => {
    setListOpen(false);
  });

  return (
    <div className='relative flex h-[70px] items-center px-2 md:h-[80px] xl:h-[100px]'>
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
          ref={ref}
          role='menu'
          className='border-black-353542 bg-black-252530 absolute top-13 left-0 z-10 w-36 rounded-lg border px-2 py-2 xl:right-[120px]'
        >
          <ul>
            <li className='hover:bg-black-353542 text-white-f1f1f5 rounded-lg px-2 py-1'>
              <Link href='/mypage' onClick={() => setListOpen(false)}>
                내 프로필
              </Link>
            </li>
            <li className='hover:bg-black-353542 text-white-f1f1f5 rounded-lg px-2 py-1'>
              <button
                onClick={() => {
                  setListOpen(false);
                  signOut();
                }}
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
