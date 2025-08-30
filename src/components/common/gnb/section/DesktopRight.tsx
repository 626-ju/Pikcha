'use client';

import CompareButton from '../buttons/CompareButton';
import LoginButton from '../buttons/LoginButton';
import SignupButton from '../buttons/SignupButton';
import ProfileDropdown from '../profile/ProfileDropdown';

import type { Session } from 'next-auth';

interface DesktopRightProps {
  session: Session | null;
}

const DesktopRight = ({ session }: DesktopRightProps) => {
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
