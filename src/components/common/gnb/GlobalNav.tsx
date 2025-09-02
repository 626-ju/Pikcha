import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import DesktopCenter from './section/DesktopCenter';
import DesktopLeft from './section/DesktopLeft';
import DesktopRight from './section/DesktopRight';
import MobileCenter from './section/MobileCenter';
import MobileLeft from './section/MobileLeft';
import MobileRight from './section/MobileRight';

const GlobalNav = () => {
  return (
    <header className='border-black-2e2e3a md:px=[30px] bg-black-1c1c22 sticky top-0 z-50 h-[70px] border-b-2 shadow-sm shadow-black md:h-[80px] xl:h-[100px] xl:px-[120px]'>
      <div className='mx-auto flex h-full items-center gap-4 px-5'>
        <MobileNav left={<MobileLeft />} center={<MobileCenter />} right={<MobileRight />} />
        <DesktopNav left={<DesktopLeft />} center={<DesktopCenter />} right={<DesktopRight />} />
      </div>
    </header>
  );
};

export default GlobalNav;
