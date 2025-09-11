'use client';

import { CircleCheckBig } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import StarIcon from '@/assets/icon/Icon-star.svg';
import Button from '@/components/ui/Buttons';
import { verifyImgUrl } from '@/lib/utils/verifyImgUrl';
import { type ProductDetail } from '@/types/product/productType';

interface CompareCardProps {
  product: ProductDetail;
  isSelected: boolean;
  onSelect: (productId: number) => void;
}

const CompareCard = ({ product, isSelected, onSelect }: CompareCardProps) => {
  const averageRating = Math.round(product.rating * 10) / 10;
  const imgUrl = verifyImgUrl(product.image);

  return (
    <div className='relative'>
      <div
        className={`border-black-353542 block cursor-pointer rounded-[8px] transition-all ${
          isSelected
            ? 'border-main-indigo border-3'
            : 'border-3 border-transparent hover:border-gray-500'
        }`}
        onClick={() => onSelect(product.id)}
      >
        <div className='relative mb-1 aspect-[5/7]'>
          <Image
            src={imgUrl ?? '/images/profile-overay.jpg'}
            alt={`${product.name} 사진`}
            fill
            className='rounded-sm'
            sizes='(max-width: 768px) 140px, (max-width: 1280px) 227px, 260px'
          />
          {isSelected && (
            <div className='absolute inset-0 flex items-center justify-center rounded-sm bg-blue-500/20'>
              <CircleCheckBig className='text-main-indigo h-14 w-14 rounded-full bg-white p-1 md:h-8 md:w-8 xl:h-14 xl:w-14' />
            </div>
          )}
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

      <Link href={`/products/${product.id}`} className='mt-3 block'>
        <Button variant='secondary' className='w-full'>
          상세보기
        </Button>
      </Link>
    </div>
  );
};

export default CompareCard;
