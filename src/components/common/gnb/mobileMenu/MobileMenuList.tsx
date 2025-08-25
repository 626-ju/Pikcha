'use client';

import Link from 'next/link';

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
        <div className='flex-1 pt-5'>
          <h2 className='text-white-f1f1f5 text-mogazoa-20px-600 mb-6'>메뉴</h2>
          <ul className='pt-3'>
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
                onClick={onClose}
                className='hover:bg-black-353542 text-white-f1f1f5 text-mogazoa-18px-400 w-full rounded-lg px-4 py-3 text-left transition-colors'
              >
                로그아웃
              </button>
              {/* <button onClick={()=> signOut()}>로그아웃</button> -> auth 세팅 이후 사용 */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuList;
