'use client';

import Image from 'next/image';
import Link from 'next/link';

import StarIcon from '@/assets/icon/Icon-star.svg';
import Button from '@/components/ui/Buttons';
import { type Product } from '@/types/product/productType';

interface CompareCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (product: Product) => void;
}

const CompareCard = ({ product, isSelected, onSelect }: CompareCardProps) => {
  const averageRating = Math.round(product.rating * 10) / 10;

  return (
    <div
      className={`flex gap-3 rounded-lg p-3 transition-colors ${
        isSelected ? 'bg-black-2e2e3a/50' : 'hover:bg-black-2e2e3a/20'
      }`}
    >
      <div className='flex items-start pt-2'>
        <input
          type='checkbox'
          checked={isSelected}
          onChange={() => onSelect(product)}
          className='h-5 w-5 accent-blue-500'
        />
      </div>

      <div className='flex flex-1 flex-col'>
        <div
          className='border-black-353542 bg-black-252530 cursor-pointer rounded-[8px] p-2.5 xl:p-5'
          onClick={() => onSelect(product)}
        >
          <div className='relative mb-2.5 h-[98px] w-[140px] md:mb-5 md:h-[160px] md:w-[227px] xl:mb-[25px] xl:h-[200px] xl:w-[260px]'>
            <Image
              src={'/images/profile-overay.jpg'}
              alt={`${product.name} 사진`}
              style={{ backgroundImage: "url('/images/profile-overay.jpg')" }}
              fill
              sizes='260px'
            />
          </div>

          <div className='flex flex-col'>
            <h3 className='text-mogazoa-14px-500 md:text-mogazoa-16px-500 xl:text-mogazoa-18px-500 mb-[5px] line-clamp-1 w-[140px] md:w-[227px] xl:w-[260px]'>
              {product.name}
            </h3>
            <div className='text-mogazoa-12px-300 md:text-mogazoa-14px-300 xl:text-mogazoa-16px-300 text-gray-6e6e82 flex flex-col md:flex-row md:justify-between'>
              <div className='mb-[5px]'>
                <span className='mr-2.5'>후기 {product.reviewCount}</span>
                <span>찜 {product.favoriteCount}</span>
              </div>
              <div className='text-yellow-ffc83c'>
                <StarIcon className='mr-[2px] inline-block h-3 w-3' />
                <span className='text-gray-9fa6b2'>{averageRating}</span>
              </div>
            </div>
          </div>
        </div>

        <Link href={`/products/${product.id}`} className='mt-3'>
          <Button variant='secondary' className='w-full'>
            상세보기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CompareCard;
