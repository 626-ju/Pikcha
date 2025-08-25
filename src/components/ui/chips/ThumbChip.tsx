'use client';

import ThumbsDownIcon from '@/../public/icon/Icon-thumbsdown.svg';
import ThumbsUpIcon from '@/../public/icon/Icon-thumbsup.svg';
import useOptimisticToggle from '@/hooks/useOptimisticToggle';
import { cn } from '@/lib/utils';

const ThumbChip = ({
  initialCount,
  initialState,
  asyncAction,
}: {
  initialCount: number; //likeCount
  initialState: boolean; // isLiked 주세여
  asyncAction: () => Promise<void>; // /reviews/{reviewId}/like
}) => {
  const { isToggled, optimisticCount, handleToggle } = useOptimisticToggle({
    initialCount,
    initialState,
    asyncAction,
  });

  return (
    <button
      type='button'
      onClick={handleToggle}
      className={cn(
        'text-mogazoa-12px-400 xl:text-mogazoa-14px-400 border-black-353542 bg-black-252530 flex items-center justify-center gap-[5px] rounded-full border-[1px] px-[10px] py-[6px]',
        isToggled ? 'text-gradient' : 'text-gray-9fa6b2',
      )}
    >
      {isToggled ? <ThumbsUpIcon /> : <ThumbsDownIcon />}
      <p>{optimisticCount}</p>
    </button>
  );
};
export default ThumbChip;
