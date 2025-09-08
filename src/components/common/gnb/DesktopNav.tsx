import { ReactNode } from 'react';

interface DesktopNavProps {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
}

const DesktopNav = ({ left, center, right }: DesktopNavProps) => {
  return (
    <div className='hidden w-full items-center md:flex'>
      <div className='flex-shrink-0'>{left}</div>
      <div className='flex flex-1 items-center justify-end md:gap-[30px]'>{center}</div>
      <div className='flex w-[200px] flex-shrink-0 justify-end xl:w-[230px]'>{right}</div>
    </div>
  );
};

export default DesktopNav;
