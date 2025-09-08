'use client';

import { toggleReviewLike } from '@/actions/review/review';
import ThumbsDownIcon from '@/assets/icon/Icon-thumbsdown.svg';
import ThumbsUpIcon from '@/assets/icon/Icon-thumbsup.svg';
import useOptimisticToggle from '@/hooks/useOptimisticToggle';
import { cn } from '@/lib/utils';
import { ThumbChipProps } from '@/types/chips';

const ThumbChip = ({ initialCount, initialState, reviewId }: ThumbChipProps) => {
  const { isToggled, optimisticCount, handleToggle } = useOptimisticToggle({
    initialCount,
    initialState,
    asyncAction: async () => {
      await toggleReviewLike(reviewId, isToggled);
    },
  });

  return (
    <button
      type='button'
      onClick={handleToggle}
      className={cn(
        'text-mogazoa-12px-400 xl:text-mogazoa-18px-400 border-black-353542 bg-black-252530 light:bg-white flex shrink-0 items-center justify-center gap-[5px] rounded-full border-[1px] px-[10px] py-[6px]',
        isToggled ? 'text-gradient' : 'text-gray-9fa6b2',
      )}
    >
      {isToggled ? (
        <ThumbsUpIcon className='h-[18px] w-[18px] xl:h-[24px] xl:w-[24px]' />
      ) : (
        <ThumbsDownIcon className='h-[18px] w-[18px] xl:h-[24px] xl:w-[24px]' />
      )}
      <p>{optimisticCount}</p>
    </button>
  );
};
export default ThumbChip;
