import MobileMenu from '../mobileMenu/MobileMenu';

import type { Session } from 'next-auth';

interface MobileLeftProps {
  session: Session | null;
}

const MobileLeft = ({ session }: MobileLeftProps) => {
  return <MobileMenu session={session} />;
};

export default MobileLeft;
