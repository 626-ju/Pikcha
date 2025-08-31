import Image from 'next/image';
import Link from 'next/link';

import StarIcon from '@/assets/icon/Icon-star.svg';
import { type Product } from '@/types/product/productType';

interface Props {
  movie: Product;
}

const ProductCard = ({ movie }: Props) => {
  const averageRating = Math.round(movie.rating * 10) / 10;

  return (
    <Link
      href={`/products/${movie.id}`}
      className='border-black-353542 bg-black-252530 block rounded-[8px] p-2.5 xl:p-5'
    >
      {/* 컨텐츠 영화로 했을 때는 세로로 좀 더 길어야 할 것 같은데 고민이네요 */}
      <div className='relative mb-2.5 h-[98px] w-[140px] md:mb-5 md:h-[160px] md:w-[227px] xl:mb-[25px] xl:h-[200px] xl:w-[260px]'>
        <Image
          src={'/images/profile-overay.jpg'}
          alt={`${movie.name} 사진`}
          style={{ backgroundImage: "url('/images/profile-overay.jpg')" }}
          fill
          sizes='260px'
        />
      </div>
      <div className='flex flex-col'>
        <h3 className='text-mogazoa-14px-500 md:text-mogazoa-16px-500 xl:text-mogazoa-18px-500 mb-[5px] line-clamp-1 w-[140px] md:w-[227px] xl:w-[260px]'>
          {movie.name}
        </h3>
        <div className='text-mogazoa-12px-300 md:text-mogazoa-14px-300 xl:text-mogazoa-16px-300 text-gray-6e6e82 flex flex-col md:flex-row md:justify-between'>
          <div className='mb-[5px]'>
            <span className='mr-2.5'>후기 {Math.floor(movie.reviewCount)}</span>
            <span>찜 {movie.favoriteCount}</span>
          </div>
          <div className='text-yellow-ffc83c'>
            <StarIcon className='mr-[2px] inline-block h-3 w-3' />
            <span className='text-gray-9fa6b2'>{averageRating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
