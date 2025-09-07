'use client';

import { useSession } from 'next-auth/react';

import CompareButton from '../buttons/CompareButton';
import LoginButton from '../buttons/LoginButton';
import SignupButton from '../buttons/SignupButton';
import ProfileDropdown from '../profile/ProfileDropdown';

const DesktopRight = () => {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  return (
    <div className='flex h-[70px] md:h-[80px] xl:h-[100px]'>
      {/* guest */}
      <div
        className={
          isLoggedIn ? 'hidden' : 'flex w-[180px] gap-4 md:w-[230px] md:gap-5 xl:w-[280px] xl:gap-6'
        }
      >
        <div className='flex flex-1 justify-center'>
          <LoginButton />
        </div>
        <div className='flex flex-1 justify-center'>
          <SignupButton />
        </div>
      </div>
      {/* auth */}
      <div
        className={
          isLoggedIn
            ? 'flex w-[180px] items-center gap-4 md:w-[230px] md:gap-5 xl:w-[280px] xl:gap-6'
            : 'hidden'
        }
      >
        <div className='flex flex-1 justify-center'>
          <CompareButton />
        </div>
        <div className='flex flex-1 justify-center'>
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default DesktopRight;
