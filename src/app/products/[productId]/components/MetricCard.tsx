import { CalculationMapProps, ProductDetail } from '@/types/product/productType';

import { METRIC_CONFIG } from './MetricConfig';

const calculationMap: CalculationMapProps = {
  rating: (product) => Math.trunc(product.rating * 10 - product.categoryMetric.rating * 10) / 10,
  favorite: (product) => Math.trunc(product.favoriteCount - product.categoryMetric.favoriteCount),
  review: (product) => Math.trunc(product.reviewCount - product.categoryMetric.reviewCount),
};

interface MetricCardProps {
  variant: 'rating' | 'favorite' | 'review';
  product: ProductDetail;
}

const MetricCard = ({ variant, product }: MetricCardProps) => {
  const { title, unit, icon, isSmaller, isGreater } = METRIC_CONFIG[variant];

  const initialCount = () => {
    if (variant === 'rating') return Math.trunc(product.rating * 10) / 10;
    if (variant === 'favorite') return product.favoriteCount?.toLocaleString();
    if (variant === 'review') return Math.trunc(product.reviewCount)?.toLocaleString();
  };

  const comparisonCount = calculationMap[variant] ? calculationMap[variant](product) : null;

  const comparisonStatus = comparisonCount && comparisonCount > 0 ? isGreater : isSmaller;

  const comparisonResult = `${comparisonCount && Math.abs(comparisonCount)}${unit}`;

  return (
    <div className='bg-black-252530 light:bg-white border-black-353542 flex h-[82px] w-full flex-col gap-[5px] rounded-[12px] border-[1px] p-5 transition-normal duration-300 md:h-[169px] md:items-center md:justify-center md:gap-[15px] xl:h-[190px]'>
      <div className='flex gap-[10px] md:flex-col md:items-center'>
        <h3 className='text-mogazoa-14px-500 md:text-mogazoa-16px-500 xl:text-mogazoa-18px-500'>
          {title}
        </h3>
        <div className='flex items-center gap-[5px]'>
          {icon}
          <div className='text-mogazoa-16px-300 md:text-mogazoa-20px-300 xl:text-mogazoa-24px-300 text-gray-9fa6b2'>
            {initialCount()}
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
