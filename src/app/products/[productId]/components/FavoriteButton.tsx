'use client';

import FavoriteIcon from '@/assets/icon/Icon-favorite.svg';
import UnFavoriteIcon from '@/assets/icon/Icon-unfavorite.svg';
import useOptimisticToggle from '@/hooks/useOptimisticToggle';

interface FavoriteButtonProps {
  asyncAction: () => Promise<void>;
  initialState: boolean;
}

const FavoriteButton = ({ asyncAction, initialState }: FavoriteButtonProps) => {
  const { isToggled, handleToggle } = useOptimisticToggle({ asyncAction, initialState });
  return (
    <button type='button' onClick={handleToggle} className='h-6 w-6 xl:h-7 xl:w-7'>
      {isToggled ? <FavoriteIcon /> : <UnFavoriteIcon />}
    </button>
  );
};

export default FavoriteButton;
