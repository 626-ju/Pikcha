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
      await postProductFavorite(productId, isToggled);
    },
    initialState,
  });
  return (
    <button
      type='button'
      aria-label='찜하기'
      onClick={handleToggle}
      className='h-6 w-6 xl:h-7 xl:w-7'
    >
      {isToggled ? <FavoriteIcon /> : <UnFavoriteIcon />}
    </button>
  );
};

export default FavoriteButton;
