'use client';

import { toast } from 'sonner';

import KakaoIcon from '@/assets/icon/Icon-kakao.svg';
import ShareIcon from '@/assets/icon/Icon-share.svg';
import { cn } from '@/lib/utils';

const ShareButton = ({
  variant,
  className,
}: {
  variant: 'primary' | 'kakao';
  className?: string;
}) => {
  //kakaoTalk 공유 로직
  const handleClickShareKakao = () => {
    if (!window.Kakao) return toast.error('카카오톡 공유하기를 실패하였습니다.');
    window.Kakao.Share.sendScrap({
      requestUrl: window.location.href,
      // 공유 내용 리팩토링 필요
    });
    toast.success('카카오톡으로 고유를 완료하였습니다.');
    // 공유 완료되고 뜰 수 있게 리팩토링
  };

  //URL share 로직
  const handleClickCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Url 주소를 복사하였습니다.');
    } catch {
      toast.error('URL을 복사하는데에 실패하였습니다.');
    }
  };

  const baseClassName =
    'bg-black-252530 light:bg-white flex h-6 w-6 items-center justify-center rounded-[6px] md:h-7 md:w-7 xl:h-8 xl:w-8';

  return (
    <>
      {variant === 'primary' ? (
        <button type='button' className={cn(baseClassName, className)} onClick={handleClickCopyUrl}>
          <ShareIcon className='h-[14px] w-[14px] md:h-[18px] md:w-[18px] xl:h-[22px] xl:w-[22px]' />
        </button>
      ) : (
        <button
          type='button'
          className={cn(baseClassName, className)}
          onClick={handleClickShareKakao}
        >
          <KakaoIcon className='h-[14px] w-[14px] md:h-[18px] md:w-[18px] xl:h-[22px] xl:w-[22px]' />
        </button>
      )}
    </>
  );
};

export default ShareButton;
