'use client';

import KakaoIcon14 from '@/../public/icon/Icon-kakao14.svg';
import KakaoIcon18 from '@/../public/icon/Icon-kakao18.svg';
import ShareIcon14 from '@/../public/icon/Icon-share14.svg';
import ShareIcon18 from '@/../public/icon/Icon-share18.svg';
import { cn } from '@/lib/utils';

const ShareButton = ({ variant }: { variant: 'primary' | 'kakao' }) => {
  //kakaoTalk 공유 로직
  //URL share 로직  variant 로 분기 처리하기
  return (
    <button
      type='button'
      className={cn(
        'bg-black-252530 flex h-6 w-6 items-center justify-center rounded-[6px] xl:h-7 xl:w-7',
      )}
    >
      {variant === 'primary' ? (
        <>
          <ShareIcon14 className='xl:hidden' />
          <ShareIcon18 className='hidden xl:block' />
        </>
      ) : (
        <>
          <KakaoIcon14 className='xl:hidden' />
          <KakaoIcon18 className='hidden xl:block' />
        </>
      )}
    </button>
  );
};

export default ShareButton;
