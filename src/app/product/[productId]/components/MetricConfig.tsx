import FavoriteIcon20 from '@/../public/icon/Icon-favorite20.svg';
import FavoriteIcon24 from '@/../public/icon/Icon-favorite24.svg';
import ReviewIcon20 from '@/../public/icon/Icon-review20.svg';
import ReviewIcon24 from '@/../public/icon/Icon-review24.svg';
import StarIcon20 from '@/../public/icon/Icon-star20.svg';
import StarIcon24 from '@/../public/icon/Icon-star24.svg';

export const METRIC_CONFIG = {
  rating: {
    title: '별점 평균',
    unit: '점',
    isGreater: '더 높아요!',
    isSmaller: '더 낮아요!',
    icon: (
      <>
        <StarIcon20 className='xl:hidden' />
        <StarIcon24 className='hidden xl:block' />
      </>
    ),
  },
  favorite: {
    title: '찜',
    unit: '개',
    isGreater: '더 많아요!',
    isSmaller: '더 적어요!',
    icon: (
      <>
        <FavoriteIcon20 className='xl:hidden' />
        <FavoriteIcon24 className='hidden xl:block' />
      </>
    ),
  },
  review: {
    title: '리뷰',
    unit: '개',
    isGreater: '더 많아요!',
    isSmaller: '더 적어요!',
    icon: (
      <>
        <ReviewIcon20 className='xl:hidden' />
        <ReviewIcon24 className='hidden xl:block' />
      </>
    ),
  },
};
