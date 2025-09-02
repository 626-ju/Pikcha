'use client';

import { postProductFavorite } from '@/actions/productFavorite';
import FavoriteIcon from '@/assets/icon/Icon-favorite.svg';
import UnFavoriteIcon from '@/assets/icon/Icon-unfavorite.svg';
import useOptimisticToggle from '@/hooks/useOptimisticToggle';

interface FavoriteButtonProps {
  productId: number;
  initialState: boolean;
}

const FavoriteButton = ({ productId, initialState }: FavoriteButtonProps) => {
  const { isToggled, handleToggle } = useOptimisticToggle({
    asyncAction: async () => {
      await postProductFavorite(productId, initialState);
    },
    initialState,
  });
  return (
    <button type='button' onClick={handleToggle} className='h-6 w-6 xl:h-7 xl:w-7'>
      {isToggled ? <FavoriteIcon /> : <UnFavoriteIcon />}
    </button>
  );
};

export default FavoriteButton;
