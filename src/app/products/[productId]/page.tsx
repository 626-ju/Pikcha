import Image from 'next/image';

import { getProductDetail } from '@/actions/productDetail';
import { getProductReviews } from '@/actions/review/review';
import CategoryChip from '@/components/ui/chips/CategoryChip';

import FavoriteButton from './components/FavoriteButton';
import MetricCard from './components/MetricCard';
import ProductTriggers from './components/ProductTriggers';
import ReviewSection from './components/ReviewSection';
import ShareButton from './components/ShareButton';

// 찜버튼 임시 함수
async function randomPromise(): Promise<void> {
  'use server';
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      if (isSuccess) {
        resolve();
      } else {
        reject(new Error(`Error! Rejected after 1000ms`));
      }
    }, 1000);
  });
}

type ProductIdPageProps = {
  params: Promise<{ productId: string }>;
};

const ProductIdPage = async ({ params }: ProductIdPageProps) => {
  const { productId } = await params;
  const currentProductId = Number(productId);

  const product = await getProductDetail(currentProductId);
  const reviews = await getProductReviews(currentProductId);

  return (
    <div className='mx-auto max-w-250 px-5 py-10'>
      <header className='flex w-full flex-col md:max-h-[300px] md:flex-row'>
        <div className='relative aspect-[27/40] h-60 shrink-0 transition-normal duration-300 md:max-h-[300px] xl:h-[300px]'>
          <Image src={product.image} alt='영화 포스터' fill className='object-cover' />
        </div>
        <div className='mt-5 flex w-full flex-col gap-[10px] md:mt-0 md:pl-5'>
          <div className='flex justify-between'>
            <CategoryChip category={product.category} className='md:text-mogazoa-14px-400' />
            <div className='flex items-center justify-center gap-[10px]'>
              <ShareButton variant='kakao' />
              <ShareButton variant='primary' />
            </div>
          </div>
          <div className='flex items-center justify-between md:justify-start md:gap-[15px]'>
            <h2 className='text-mogazoa-20px-600 xl:text-mogazoa-24px-600'>{product.name}</h2>
            <FavoriteButton initialState={product.isFavorite} asyncAction={randomPromise} />
          </div>
          <div className='text-mogazoa-14px-400 flex-1'>{product.description}</div>
          <ProductTriggers product={product} />
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
      <ReviewSection productId={currentProductId} initialReviews={reviews} />
    </div>
  );
};

export default ProductIdPage;
