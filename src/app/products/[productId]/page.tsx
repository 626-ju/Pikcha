import SortDropdown from '@/components/common/dropdowns/SortDropdown';
import Button from '@/components/ui/Buttons';
import CategoryChip from '@/components/ui/chips/CategoryChip';

import MetricCard from '@/app/product/[productId]/components/MetricCard';
import mockReviews from '@/app/product/[productId]/components/mock';
import ReviewCard from '@/app/product/[productId]/components/ReviewCard';
import ShareButton from '@/app/product/[productId]/components/ShareButton';

const ProductIdPage = () => {
  const product = {
    id: 1,
    name: '어쩌고 저쩌고',
    description:
      '뭐가될지 모르지만 아주 긴 디스크립션 뭐가될지 모르지만 아주 긴 디스크립션 뭐가될지 모르지만 아주 긴 디스크립션 뭐가될지 모르지만 아주 긴 디스크립션 뭐가될지 모르지만 아주 긴 디스크립션 뭐가될지 모르지만 아주 긴 디스크립션 뭐가될지 모르지만 아주 긴 디스크립션 뭐가될지 모르지만 아주 긴 디스크립션 뭐가될지 모르지만 아주 긴 디스크립션 ',
    image:
      'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MWP22?wid=1144&hei=1144&fmt=jpeg&qlt=80&.v=1591634795000',
    rating: 4.5,
    reviewCount: 100,
    favoriteCount: 1000,
    categoryId: 1,
    createdAt: '2025-07-15T12:19:35.432Z',
    updatedAt: '2025-07-15T12:19:35.432Z',
    writerId: 1,
    isFavorite: false,
    category: {
      id: 1,
      name: '전자제품',
    },
    categoryMetric: {
      rating: 4.6,
      favoriteCount: 1023,
      reviewCount: 35,
    },
  };

  return (
    <div className='mx-auto max-w-[1000px] px-5 py-10'>
      <header className='flex w-full flex-col md:max-h-[300px] md:flex-row'>
        <div className='aspect-[27/40] h-60 shrink-0 bg-amber-300 transition-normal duration-300 md:max-h-[300px] xl:h-[300px]'>
          이미지
        </div>
        <div className='mt-5 flex w-full flex-col gap-[10px] md:mt-0 md:pl-5'>
          <div className='flex justify-between'>
            <CategoryChip category={product.category} className='md:text-mogazoa-14px-400' />
            <div className='flex items-center justify-center gap-[10px]'>
              <ShareButton variant='kakao' />
              <ShareButton variant='primary' />
            </div>
          </div>
          <div className='flex justify-between'>
            <h2 className='text-mogazoa-20px-600'>{product.name}</h2>

            {'찜 버튼'}
          </div>
          <div className='text-mogazoa-14px-400 flex-1'>{product.description}</div>
          <div className='flex w-full flex-col gap-[15px] md:flex-row'>
            <Button variant='primary' type='button' className='md:flex-2'>
              리뷰 작성하기
            </Button>
            <Button variant='secondary' type='button' className='md:flex-1'>
              비교하기
            </Button>
            {product.writerId === 1 && (
              <Button variant='tertiary' type='button' className='md:flex-1'>
                편집하기
              </Button>
            )}
          </div>
        </div>
      </header>
      <section className='my-20'>
        <h2 className='text-mogazoa-18px-600 xl:text-mogazoa-20px-600 my-9'>상품통계</h2>
        <div className='flex flex-col gap-[15px] md:flex-row'>
          <MetricCard variant='rating' product={product} />
          <MetricCard variant='favorite' product={product} />
          <MetricCard variant='review' product={product} />
        </div>
      </section>
      <section>
        <div className='mb-5 flex justify-between'>
          <h2 className='text-mogazoa-18px-600 xl:text-mogazoa-20px-600'>상품리뷰</h2>
          <SortDropdown variant='review' />
        </div>
        <div className='flex flex-col gap-3'>
          {mockReviews?.map((rev) => (
            <ReviewCard review={rev} key={rev.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductIdPage;
