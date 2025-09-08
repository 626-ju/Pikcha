import Image from 'next/image';

import { verifyImgUrl } from '@/lib/utils/verifyImgUrl';
import { type Product } from '@/types/product/productType';

interface CompareMovieCardsProps {
  products: [Product, Product];
}

const CompareMovieCards = ({ products }: CompareMovieCardsProps) => {
  const [product1, product2] = products;

  return (
    <div className='flex justify-center gap-8'>
      <div className='w-[140px] text-center md:w-[227px] xl:w-[260px]'>
        <div className='relative mb-1 aspect-[5/7]'>
          <Image
            src={verifyImgUrl(product1.image) ?? '/images/profile-overay.jpg'}
            alt={product1.name}
            fill
            className='rounded-sm'
            sizes='(max-width: 768px) 140px, (max-width: 1280px) 227px, 260px'
          />
        </div>
      </div>

      <div className='w-[140px] text-center md:w-[227px] xl:w-[260px]'>
        <div className='relative mb-1 aspect-[5/7]'>
          <Image
            src={verifyImgUrl(product2.image) ?? '/images/profile-overay.jpg'}
            alt={product2.name}
            fill
            className='rounded-sm'
            sizes='(max-width: 768px) 140px, (max-width: 1280px) 227px, 260px'
          />
        </div>
      </div>
    </div>
  );
};

export default CompareMovieCards;

// 카드하고 리스트를 한 번 더 나눠야할까?
