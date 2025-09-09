'use client';

import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import FacebookIcon from '@/assets/icon/Icon-facebook.svg';
import InstaIcon from '@/assets/icon/Icon-instagram.svg';
import TempLogo from '@/assets/icon/Icon-templogo.svg';
import XIcon from '@/assets/icon/Icon-x.svg';

const Footer = () => {
  const pathname = usePathname();

  const [hideFooter, setHideFooter] = useState(false);

  useEffect(() => {
    const hideFooterPaths = ['/signin', '/signup'];
    const hideByPath = hideFooterPaths.includes(pathname);
    const hideByClass = document.body.classList.contains('hide-footer');

    setHideFooter(hideByPath || hideByClass);
  }, [pathname]);

  if (hideFooter) return null;

  return (
    <footer className='text-mogazoa-14px-400 bg-black-1c1c22 text-white-f1f1f5/60 border-black-2e2e3a relative flex flex-col justify-between border-t-2 px-5 py-10 shadow-[0_-1px_2px_0_rgba(0,0,0,1)] xl:px-[140px] 2xl:flex-row'>
      {/* shadow-[0_-1px_2px_0_rgba(0,0,0,1)] */}
      {/* gnb 그림자 -> 아래쪽에만 생김 shadow-sm shadow-black*/}
      <div className='mr-20'>
        <ul className='mb-5 flex items-center gap-2.5'>
          <li className='border-white-f1f1f5/60 h-5 border-r-1 pr-2.5'>문의</li>
          <li>pickcha@gmail.com ,</li>
          <li>
            <a
              href='https://github.com/TEAM3-Mogazoa/Mogazoa'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='픽챠 깃허브로 이동'
              className='hover:underline'
            >
              pickcha [github]
            </a>
          </li>
        </ul>

        <ul className='mb-5 flex items-center gap-2.5'>
          <li className='border-white-f1f1f5/60 border-r-1 pr-2.5'> 픽챠 </li>
          <li className='border-white-f1f1f5/60 border-r-1 pr-2.5'>김성주 나소연 남만재 배민지</li>
          <li>코드잇 16기 파트4 3팀</li>
        </ul>
      </div>

      <ul className='mb-5 flex items-center gap-2.5 2xl:absolute 2xl:left-1/2 2xl:mt-[-8px] 2xl:-translate-x-1/2 2xl:flex-col'>
        <li>
          <TempLogo width={80} height={40} />
        </li>
        <li className='2xl:text-center'>&copy; 2025 by 3team All rights reserved.</li>
      </ul>

      <ul className='text-white-f1f1f5/60 relative flex items-end gap-5 md:absolute md:right-5 md:bottom-15 md:justify-end xl:right-30'>
        {/* md:absolute md:right-5 md:bottom-15 xl:right-30  */}
        <li className='hover:text-white-f1f1f5'>
          <a
            href='https://www.instagram.com/'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='인스타그램으로 이동'
          >
            <InstaIcon width={30} height={30} />
          </a>
        </li>
        <li className='hover:text-white-f1f1f5'>
          <a
            href='https://www.facebook.com/?locale=ko_KR'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='페이스북으로 이동'
          >
            <FacebookIcon width={30} height={30} />
          </a>
        </li>
        <li className='hover:text-white-f1f1f5'>
          <a
            href='https://x.com/?lang=ko'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='x로 이동'
          >
            <XIcon width={30} height={30} />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
