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
    <div>
      {/* guest */}
      <div className={isLoggedIn ? 'hidden' : 'flex md:gap-[30px] xl:gap-[60px]'}>
        <LoginButton />
        <SignupButton />
      </div>
      {/* auth */}
      <div className={isLoggedIn ? 'flex items-center md:gap-[30px] xl:gap-[60px]' : 'hidden'}>
        <CompareButton />
        <ProfileDropdown session={session} />
      </div>
    </div>
  );
};

export default DesktopRight;
