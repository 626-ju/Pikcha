'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { useCompareStore } from '@/store/compareStore';

import AvatarProfile from '../profile/AvatarProfile';

const MobileMenuList = ({
  isLoggedIn,
  name,
  profileUrl,
  onClose,
}: {
  isLoggedIn: boolean;
  name?: string | null;
  profileUrl?: string | null;
  onClose: () => void;
}) => {
  const { compareList, clearCompareList } = useCompareStore();
  const count = compareList.length;

  return (
    <div className='flex h-full flex-col'>
      {/* guest */}
      <div className={isLoggedIn ? 'hidden' : 'flex flex-col space-y-6'}>
        <div className='space-y-4'>
          <h2 className='text-white-f1f1f5 text-mogazoa-20px-600 mb-6'>메뉴</h2>
          <ul className='pt-3'>
            <li>
              <Link
                href='/signin'
                onClick={onClose}
                className='hover:bg-black-353542 text-white-f1f1f5 text-mogazoa-18px-400 block rounded-lg px-4 py-3 transition-colors'
              >
                로그인
              </Link>
            </li>
            <li>
              <Link
                href='/signup'
                onClick={onClose}
                className='hover:bg-black-353542 text-white-f1f1f5 text-mogazoa-18px-400 block rounded-lg px-4 py-3 transition-colors'
              >
                회원가입
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* auth */}
      <div className={isLoggedIn ? 'flex h-full flex-col' : 'hidden'}>
        {/* 프로필 섹션 */}
        <div className='bg-black-1c1c22 mb-8 rounded-lg p-4'>
          <AvatarProfile profileImg={profileUrl} userName={name} />
        </div>
        {/* 메뉴 섹션 */}
        <div className='flex-1 pt-1 pl-1'>
          <h2 className='text-white-f1f1f5 text-mogazoa-20px-600 mb-2'>메뉴</h2>
          <ul>
            <li>
              <Link
                href='/compare'
                onClick={onClose}
                className='hover:bg-black-353542 text-white-f1f1f5 text-mogazoa-18px-400 flex items-center gap-2 rounded-lg px-4 py-3 transition-colors'
              >
                비교하기
                {count > 0 && (
                  <span className='bg-main-gradation text-white-f1f1f5 text-mogazoa-12px-300 flex h-4 w-4 min-w-4 items-center justify-center rounded-full'>
                    {count}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href='/mypage'
                onClick={onClose}
                className='hover:bg-black-353542 text-white-f1f1f5 text-mogazoa-18px-400 block rounded-lg px-4 py-3 transition-colors'
              >
                내 프로필
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  onClose();
                  clearCompareList();
                  signOut();
                }}
                className='hover:bg-black-353542 text-white-f1f1f5 text-mogazoa-18px-400 w-full rounded-lg px-4 py-3 text-left transition-colors'
              >
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuList;
