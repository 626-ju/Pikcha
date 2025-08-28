import DesktopCenter from './section/DesktopCenter';
import DesktopLeft from './section/DesktopLeft';
import DesktopRight from './section/DesktopRight';
import MobileCenter from './section/MobileCenter';
import MobileLeft from './section/MobileLeft';
import MobileRight from './section/MobileRight';

import type { Session } from 'next-auth';

const GlobalNav = ({ session }: { session: Session | null }) => {
  const isLoggedIn = !!session;
  return (
    <header className='border-black-2e2e3a md:px=[30px] relative z-50 h-[70px] border-b-2 shadow-sm shadow-black md:h-[80px] xl:h-[100px] xl:px-[120px]'>
      <div className='mx-auto flex h-full items-center gap-4 px-5'>
        {/*모바일*/}
        <div className='flex items-center gap-2 md:hidden'>
          <MobileLeft session={session} />
        </div>
        <div className='grid flex-1 place-items-center md:hidden'>
          <MobileCenter />
        </div>
        <div className='flex items-center gap-1 md:hidden'>
          <MobileRight />
        </div>
        {/*데스크톱*/}
        <div className='hidden w-2/7 items-center gap-2 md:flex xl:w-2/12'>
          <DesktopLeft />
        </div>
        <div className='hidden w-3/7 items-center justify-end md:flex xl:w-8/12'>
          <DesktopCenter />
        </div>
        <div className='hidden w-2/7 items-center justify-end gap-2 px-3 md:flex xl:w-2/12'>
          <DesktopRight isLoggedIn={isLoggedIn} />
        </div>
      </div>
    </header>
  );
};

export default GlobalNav;
