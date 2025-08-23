import MobileMenu from './mobileMenu/MobileMenu';
import MobileSearch from './mobileSearch/MobileSearch';
import ProfileDropdown from './profile/ProfileDropdown';
import SearchForm from './searchForm/SearchForm';

import type { HeaderConfig, HeaderItem } from '@/types/Gnb.type';

const ItemMap: Record<HeaderItem, React.ComponentType> = {
  logo: Logo,
  search: SearchForm,
  login: Login,
  signup: Signup,
  compare: Compare, // 클라이언트로 가야함.
  profile: ProfileDropdown, // 클라이언트
  'mobile-menu': MobileMenu, // 클라이언트
  'mobile-search': MobileSearch, // 클라이언트
};

function Render(items: readonly HeaderItem[]) {
  return items.map((k) => {
    const C = ItemMap[k];
    return <C key={k} />;
  });
}

const GlobalNav = ({ config }: { config: HeaderConfig }) => {
  return (
    <header className='bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md'>
      <div className='mx-auto flex h-[100px] items-center gap-2 px-3'>
        {/* 모바일*/}
        <div className='flex items-center gap-2 md:hidden'>{Render(config.mobile.left)}</div>
        <div className='grid flex-1 place-items-center md:hidden'>
          {Render(config.mobile.center)}
        </div>
        <div className='flex items-center gap-1 md:hidden'>{Render(config.mobile.right)}</div>

        {/* 데스크톱 */}
        <div className='hidden w-1/3 items-center gap-2 md:flex'>{Render(config.desktop.left)}</div>
        <div className='hidden w-1/3 items-center justify-center md:flex'>
          {Render(config.desktop.center)}
        </div>
        <div className='hidden w-1/3 items-center justify-end gap-2 md:flex'>
          {Render(config.desktop.right)}
        </div>
      </div>
    </header>
  );
};

export default GlobalNav;
