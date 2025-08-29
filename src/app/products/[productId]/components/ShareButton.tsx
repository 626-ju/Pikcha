'use client';

import KakaoIcon from '@/assets/icon/Icon-kakao.svg';
import ShareIcon from '@/assets/icon/Icon-share.svg';
import { cn } from '@/lib/utils';

const ShareButton = ({ variant }: { variant: 'primary' | 'kakao' }) => {
  //kakaoTalk 공유 로직
  //URL share 로직  variant 로 분기 처리하기
  return (
    <button
      type='button'
      className={cn(
        'bg-black-252530 flex h-6 w-6 items-center justify-center rounded-[6px] md:h-7 md:w-7 xl:h-8 xl:w-8',
      )}
    >
      {variant === 'primary' ? (
        <ShareIcon className='h-[14px] w-[14px] md:h-[18px] md:w-[18px] xl:h-[22px] xl:w-[22px]' />
      ) : (
        <KakaoIcon className='h-[14px] w-[14px] md:h-[18px] md:w-[18px] xl:h-[22px] xl:w-[22px]' />
      )}
    </button>
  );
};

export default ShareButton;
