'use client';

import ThumbsDownIcon from '@/../public/icon/Icon-thumbsdown.svg';
import ThumbsUpIcon from '@/../public/icon/Icon-thumbsup.svg';
import useOptimisticToggle from '@/hooks/useOptimisticToggle';

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
    <button type='button' onClick={handleToggle}>
      {isToggled ? <ThumbsUpIcon /> : <ThumbsDownIcon />}
      <p>{optimisticCount}</p>
    </button>
  );
};
export default ThumbChip;
