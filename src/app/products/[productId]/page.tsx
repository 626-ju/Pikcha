export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Image from 'next/image';

import { getProductDetail } from '@/actions/productDetail';
import { getProductReviews } from '@/actions/review/review';
import CategoryChip from '@/components/ui/chips/CategoryChip';

import FavoriteButton from './components/FavoriteButton';
import MetricCard from './components/MetricCard';
import ProductTriggers from './components/ProductTriggers';
import ReviewSection from './components/ReviewSection';
import ShareButton from './components/ShareButton';
import UsePreloadPoster from './components/UssPreloadPoster';

type ProductIdPageProps = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: ProductIdPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProductDetail(Number(productId));

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: product.image,
    },
  };
}

const ProductIdPage = async ({ params }: ProductIdPageProps) => {
  const { productId } = await params;
  const currentProductId = Number(productId);

  const product = await getProductDetail(currentProductId);
  const { list: reviews, nextCursor } = await getProductReviews(currentProductId);

  const posterImage =
    product.image && product.image !== 'https://example.com'
      ? product.image
      : '/images/noImage.png';

  return (
    <div className='mx-auto max-w-250 px-5 py-10'>
      <UsePreloadPoster src={posterImage} />
      <header className='flex w-full flex-col md:max-h-[350px] md:flex-row'>
        <div className='relative mx-auto aspect-[5/7] w-full shrink-0 transition-normal duration-300 md:max-w-[250px]'>
          <Image
            src={posterImage}
            alt='영화 포스터'
            width={372}
            height={520}
            sizes='(max-width: 768px) 350px, 100vw'
            priority
            fetchPriority='high'
            className='h-full w-full object-cover'
          />
        </div>
        <div className='mt-5 flex w-full flex-col gap-[10px] md:mt-0 md:pl-5'>
          <div className='flex items-center justify-between'>
            <CategoryChip category={product.category} className='md:text-mogazoa-14px-400' />
            <div className='flex items-center justify-center gap-[10px]'>
              <ShareButton variant='kakao' productId={productId} productImage={posterImage} />
              <ShareButton variant='primary' />
            </div>
          </div>
          <div className='flex items-center justify-between md:justify-start md:gap-[15px]'>
            <h2 className='text-mogazoa-20px-600 xl:text-mogazoa-24px-600'>{product.name}</h2>
            <FavoriteButton productId={currentProductId} initialState={product.isFavorite} />
          </div>
          <div className='text-mogazoa-14px-400 xl:text-mogazoa-16px-400 flex-1'>
            {product.description}
          </div>
          <ProductTriggers product={product} />
        </div>
      </header>
      <section className='mt-20 mb-15'>
        <h2 className='text-mogazoa-18px-600 xl:text-mogazoa-20px-600 my-9'>상품통계</h2>
        <div className='flex flex-col gap-[15px] md:flex-row'>
          <MetricCard variant='rating' product={product} />
          <MetricCard variant='favorite' product={product} />
          <MetricCard variant='review' product={product} />
        </div>
      </section>
      <ReviewSection
        productId={currentProductId}
        initialReviews={reviews}
        initialCursor={nextCursor}
      />
    </div>
  );
};

export default ProductIdPage;
