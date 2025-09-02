import Image from 'next/image';
import Link from 'next/link';

import StarIcon from '@/assets/icon/Icon-star.svg';
import { type Product } from '@/types/product/productType';

interface Props {
  movie: Product;
}

const ProductCard = ({ movie }: Props) => {
  const averageRating = Math.round(movie.rating * 10) / 10;

  const imgUrl = !movie.image.includes('sprint-fe-project.s3.ap-northeast-2.amazonaws.com')
    ? undefined
    : movie.image;

  return (
    <Link
      href={`/products/${movie.id}`}
      // className='border-black-353542 bg-black-252530 block rounded-[8px] p-2.5 xl:p-5'
    >
      {/* 컨텐츠 영화로 했을 때는 세로로 좀 더 길어야 할 것 같은데 고민이네요 */}
      {/* 약 5:7 */}
      {/* mb-2.5 md:mb-5  xl:mb-[25px] -> 기존 mb 임시 보관용-> 픽스나면 추후 삭제*/}
      <div className='group relative mb-1 h-[196px] w-[140px] overflow-hidden md:h-[320px] md:w-[227px] xl:h-[354px] xl:w-[260px]'>
        <Image
          src={imgUrl ?? '/images/profile-overay.jpg'}
          alt={`${movie.name} 사진`}
          style={{ backgroundImage: "url('/images/profile-overay.jpg')" }}
          fill
          sizes='260px'
          className='rounded-sm'
        />

        {/* 오버레이로 들어갈 경우 */}
        {/* <div className='absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <h3 className='text-mogazoa-14px-500 md:text-mogazoa-16px-500 xl:text-mogazoa-18px-500 mb-[5px] line-clamp-1 w-[140px] md:w-[227px] xl:w-[260px]'>
            {movie.name}
          </h3>
          <div className='text-mogazoa-12px-300 md:text-mogazoa-14px-300 xl:text-mogazoa-16px-300 flex flex-col md:flex-row md:justify-between'>
            <div className='mb-[5px]'>
              <span className='mr-2.5'>후기 {movie.reviewCount}</span>
              <span>찜 {movie.favoriteCount}</span>
            </div>
            <div className='text-yellow-ffc83c'>
              <StarIcon className='mr-[2px] inline-block h-3 w-3' />
              <span className='text-white-f1f1f5'>{averageRating}</span>
            </div>
          </div>
        </div> */}
      </div>

      {/* 카드형으로 들어갈 경우 */}
      <div className='mb-4 flex flex-col'>
        <h3 className='text-mogazoa-14px-500 md:text-mogazoa-16px-500 xl:text-mogazoa-18px-500 mb-[5px] line-clamp-1 w-[140px] md:w-[227px] xl:w-[260px]'>
          {movie.name}
        </h3>
        <div className='text-mogazoa-12px-300 md:text-mogazoa-14px-300 xl:text-mogazoa-16px-300 text-gray-6e6e82 flex flex-col md:flex-row md:justify-between'>
          <div className='mb-[5px]'>
            <span className='mr-2.5'>후기 {movie.reviewCount}</span>
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
