'use client';

import CompareButton from '../buttons/CompareButton';
import LoginButton from '../buttons/LoginButton';
import SignupButton from '../buttons/SignupButton';
import ProfileDropdown from '../profile/ProfileDropdown';

const DesktopRight = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
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
        <ProfileDropdown /> {/* 프로필 너비를 고정할 거라면 hidden 안써도 될듯 */}
      </div>
    </div>
  );
};

export default DesktopRight;
