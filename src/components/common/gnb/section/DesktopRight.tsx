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
      <div className={isLoggedIn ? 'hidden' : 'flex gap-5'}>
        <LoginButton />
        <SignupButton />
      </div>
      {/* auth */}
      <div className={isLoggedIn ? 'flex gap-5' : 'hidden'}>
        <CompareButton />
        <ProfileDropdown session={session} />
      </div>
    </div>
  );
};

export default DesktopRight;
