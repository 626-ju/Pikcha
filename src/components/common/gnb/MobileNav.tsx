import { ReactNode } from 'react';

interface MobileNavProps {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
}

const MobileNav = ({ left, center, right }: MobileNavProps) => {
  return (
    <>
      <div className='flex items-center gap-2 md:hidden'>{left}</div>
      <div className='grid flex-1 place-items-center md:hidden'>{center}</div>
      <div className='flex items-center gap-1 md:hidden'>{right}</div>
    </>
  );
};

export default MobileNav;
