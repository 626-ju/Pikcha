import { ReactNode } from 'react';

interface DesktopNavProps {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
}

const DesktopNav = ({ left, center, right }: DesktopNavProps) => {
  return (
    <div className='hidden w-full items-center justify-between md:flex'>
      <div>{left}</div>
      <div className='flex items-center md:gap-[30px] xl:gap-[60px]'>
        {center}
        {right}
      </div>
    </div>
  );
};

export default DesktopNav;
