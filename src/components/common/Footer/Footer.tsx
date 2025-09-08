import React from 'react';

import FacebookIcon from '@/assets/icon/Icon-facebook.svg';
import InstaIcon from '@/assets/icon/Icon-instagram.svg';
import TempLogo from '@/assets/icon/Icon-templogo.svg';
import XIcon from '@/assets/icon/Icon-x.svg';

const Footer = () => {
  return (
    <footer className='text-mogazoa-14px-400 bg-black-1c1c22 text-white-f1f1f5/60 border-black-2e2e3a relative flex flex-col justify-between border-t-2 px-5 pt-10 pb-20 shadow-[0_-1px_2px_0_rgba(0,0,0,1)] md:flex-row xl:px-[140px]'>
      {/* shadow-[0_-1px_2px_0_rgba(0,0,0,1)] */}
      {/* gnb 그림자 -> 아래쪽에만 생김 shadow-sm shadow-black*/}
      <div>
        <ul className='mb-5 flex items-center gap-2.5'>
          <li className='h-5 border-r-1 pr-2.5'>고객센터</li>
          <li>pickcha@gmail.com ,</li>
          <li>010-7753-2415</li>
        </ul>

        <ul className='mb-5 flex items-center gap-2.5'>
          <li className='border-r-1 pr-2.5'>(주) 픽챠 </li>
          <li className='border-r-1 pr-2.5'>대표 강영훈 </li>
          <li>서울특별시 중구 청계천로 100 시그니쳐타워 동관 10층</li>
        </ul>

        <ul className='mb-5 flex items-center gap-5'>
          <li>
            <TempLogo width={80} height={40} />
          </li>
          <li> &copy; 2025 by codeit, All rights reserved.</li>
        </ul>
      </div>

      {/* 너무 휑해서 여기에 뭐 좀 더 넣어야겠는데? */}

      <ul className='text-white-f1f1f5/60 relative flex items-end gap-5 md:absolute md:right-5 md:bottom-25 xl:right-30'>
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
