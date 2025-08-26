import FavoriteIcon20 from '@/../public/icon/Icon-favorite20.svg';
import FavoriteIcon24 from '@/../public/icon/Icon-favorite24.svg';
import ReviewIcon20 from '@/../public/icon/Icon-review20.svg';
import ReviewIcon24 from '@/../public/icon/Icon-review24.svg';
import StarIcon20 from '@/../public/icon/Icon-star20.svg';
import StarIcon24 from '@/../public/icon/Icon-star24.svg';

interface CategoryMetric {
  rating: number;
  favoriteCount: number;
  reviewCount: number;
}

interface MetricCardProps {
  variant: 'rating' | 'favorite' | 'review';
  rating?: number;
  favoriteCount?: number;
  reviewCount?: number;
  categoryMetric: CategoryMetric;
}

const MetricCard = ({
  variant,
  rating,
  favoriteCount,
  reviewCount,
  categoryMetric,
}: MetricCardProps) => {
  const cardTitle = variant === 'rating' ? '별점 평균' : variant === 'favorite' ? '찜' : '리뷰';

  const cardIcon =
    variant === 'rating' ? (
      <>
        <StarIcon20 className='xl:hidden' />
        <StarIcon24 className='hidden xl:block' />
      </>
    ) : variant === 'favorite' ? (
      <>
        <FavoriteIcon20 className='xl:hidden' />
        <FavoriteIcon24 className='hidden xl:block' />
      </>
    ) : (
      <>
        <ReviewIcon20 className='xl:hidden' />
        <ReviewIcon24 className='hidden xl:block' />
      </>
    );

  const initialCount =
    variant === 'rating'
      ? rating
      : variant === 'favorite'
        ? favoriteCount?.toLocaleString()
        : reviewCount?.toLocaleString();

  let comparisonCount;
  if (variant === 'rating' && rating)
    comparisonCount = (rating * 10 - categoryMetric.rating * 10) / 10;
  else if (variant === 'favorite' && favoriteCount)
    comparisonCount = favoriteCount - categoryMetric.favoriteCount;
  else if (variant === 'review' && reviewCount)
    comparisonCount = reviewCount - categoryMetric.reviewCount;

  const productUnit = variant === 'rating' ? '점' : '개';

  const comparisonStatus =
    comparisonCount && comparisonCount > 0
      ? variant === 'rating'
        ? '더 높아요!'
        : '더 많아요!'
      : variant === 'rating'
        ? '더 낮아요!'
        : '더 적어요!';

  const comparisonResult = `${comparisonCount && Math.abs(comparisonCount)}${productUnit}`;

  return (
    <div className='bg-black-252530 border-black-353542 flex h-[82px] w-full flex-col gap-[5px] rounded-[12px] border-[1px] p-5 transition-normal duration-300 md:h-[169px] md:max-w-[300px] md:items-center md:justify-center md:gap-[15px] xl:h-[190px]'>
      <div className='flex gap-[10px] md:flex-col md:items-center'>
        <h3 className='text-mogazoa-14px-500 md:text-mogazoa-16px-500 xl:text-mogazoa-18px-500'>
          {cardTitle}
        </h3>
        <div className='flex items-center gap-[5px]'>
          {cardIcon}
          <div className='text-mogazoa-16px-300 md:text-mogazoa-20px-300 xl:text-mogazoa-24px-300 text-gray-9fa6b2'>
            {initialCount}
          </div>
        </div>
      </div>
      <div className='text text-mogazoa-12px-300 xl:text-mogazoa-14px-300 text-gray-6e6e82 flex gap-1 md:flex-col md:items-center'>
        <p>같은 카테고리의 영화들보다</p>
        <div className='flex gap-1'>
          <p className='text-white-f1f1f5'>{comparisonResult}</p>
          <p>{comparisonStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
