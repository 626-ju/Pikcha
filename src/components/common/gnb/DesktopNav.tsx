import { ReactNode } from 'react';

interface DesktopNavProps {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
}

const DesktopNav = ({ left, center, right }: DesktopNavProps) => {
  return (
    <>
      <div className='hidden w-2/7 items-center gap-2 md:flex xl:w-2/12'>{left}</div>
      <div className='hidden w-3/7 items-center justify-end md:flex xl:w-8/12'>{center}</div>
      <div className='hidden w-2/7 items-center justify-end gap-2 px-3 md:flex xl:w-2/12'>
        {right}
      </div>
    </>
  );
};

export default DesktopNav;
