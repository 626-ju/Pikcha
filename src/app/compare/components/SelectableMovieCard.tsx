'use client';

import { CircleCheckBig } from 'lucide-react';
import Image from 'next/image';

import { verifyImgUrl } from '@/lib/utils/verifyImgUrl';
import { type ProductDetail } from '@/types/product/productType';

interface SelectableMovieCardProps {
  product: ProductDetail;
  isSelected: boolean;
  onSelect: (product: ProductDetail) => void;
}

const SelectableMovieCard = ({ product, isSelected, onSelect }: SelectableMovieCardProps) => {
  return (
    <div className={`w-[120px] text-center transition-all`}>
      <h3 className='text-mogazoa-12px-300 text-white-f1f1f5 mb-2 line-clamp-1'>{product.name}</h3>
      <div
        className={`relative mb-2 aspect-[5/7] cursor-pointer rounded-sm border-3 transition-all ${
          isSelected ? 'border-main-indigo' : 'border-transparent hover:border-gray-500'
        }`}
        onClick={() => onSelect(product)}
      >
        <Image
          src={verifyImgUrl(product.image) ?? '/images/profile-overay.jpg'}
          alt={product.name}
          fill
          className='rounded-sm'
          sizes='120px'
        />
        {isSelected && (
          <div className='absolute inset-0 flex items-center justify-center rounded-sm bg-black/20'>
            <CircleCheckBig className='text-main-indigo h-8 w-8 rounded-full bg-white p-1' />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectableMovieCard;
