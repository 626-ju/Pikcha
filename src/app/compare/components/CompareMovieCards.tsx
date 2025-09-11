import { Award } from 'lucide-react';
import Image from 'next/image';

import { verifyImgUrl } from '@/lib/utils/verifyImgUrl';
import { type ComparisonResult } from '@/types/compare/compareType';
import { type ProductDetail } from '@/types/product/productType';

interface CompareMovieCardsProps {
  products: [ProductDetail, ProductDetail];
  comparisonResult?: ComparisonResult;
}

const MovieCard = ({
  product,
  isLoser,
  isWinner,
}: {
  product: ProductDetail;
  isLoser: boolean;
  isWinner: boolean;
}) => (
  <div className='w-[140px] text-center md:w-[227px] xl:w-[260px]'>
    <div className='relative mb-1 aspect-[5/7]'>
      <Image
        src={verifyImgUrl(product.image) ?? '/images/profile-overay.jpg'}
        alt={product.name}
        fill
        className='rounded-sm'
        sizes='(max-width: 768px) 140px, (max-width: 1280px) 227px, 260px'
      />
      {isLoser && <div className='absolute inset-0 rounded-sm bg-black/70'></div>}
      {isWinner && (
        <>
          {/* 트로피 아이콘 */}
          <div className='absolute -right-5 -bottom-5 z-10'>
            <div className='bg-yellow-ffc83c animate-bounce rounded-full p-3 shadow-lg'>
              <Award className='text-main-indigo h-10 w-10' />
            </div>
          </div>
          {/* 승리 테두리 효과 */}
          <div className='border-yellow-ffc83c absolute inset-0 animate-pulse rounded-sm border-4'></div>
        </>
      )}
    </div>
  </div>
);

const CompareMovieCards = ({ products, comparisonResult }: CompareMovieCardsProps) => {
  return (
    <div className='flex items-center justify-center gap-6 md:gap-8'>
      {products.map((product, index) => (
        <MovieCard
          key={`${product.id}-${index}`}
          product={product}
          isLoser={comparisonResult?.loser?.id === product.id}
          isWinner={comparisonResult?.winner?.id === product.id}
        />
      ))}
    </div>
  );
};

export default CompareMovieCards;
