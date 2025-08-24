import StarIcon from '@/app/assets/icon/Icon-star.svg';

import DropdownTrigger from './DropdownTrigger';

interface Props {
  userid?: string;
}

const ProductList = ({ userid }: Props) => {
  // //{teamId}/users/{userId}/reviewed-products | favorite-products | created-products
  //초기값 위에서 받아서 그려야하나

  const movieList = [
    { id: 1, name: '곡성', reivewCount: 123, favoriteCount: 33, averageRating: 4.1 },
    { id: 2, name: '검은 사제들', reivewCount: 123, favoriteCount: 33, averageRating: 4.1 },
    { id: 3, name: '랑종', reivewCount: 123, favoriteCount: 33, averageRating: 4.1 },
    { id: 4, name: '인시디어스', reivewCount: 123, favoriteCount: 33, averageRating: 4.1 },
  ];

  return (
    <>
      {/* 추후에 지우겠습니다.(린트 회피용) */}
      <div className='sr-only'>{userid}</div>
      <DropdownTrigger />
      <ul className='flex max-w-[940px] flex-wrap gap-[15px] xl:gap-5'>
        {movieList.map((movie) => (
          <li className='rounded-[8px] bg-[var(--color-black-353542)] p-2.5 xl:p-5' key={movie.id}>
            {/* 컨텐츠 영화로 했을 때는 세로로 좀 더 길어야 할 것 같은데 고민이네요 */}
            <div className='mb-2.5 h-[98px] w-[140px] bg-amber-800 md:mb-5 md:h-[160px] md:w-[227px] xl:mb-[25px] xl:h-[200px] xl:w-[260px]' />
            <div className='flex flex-col'>
              <h3 className='text-mogazoa-14px-500 md:text-mogazoa-16px-500 xl:text-mogazoa-18px-500 mb-[5px]'>
                {movie.name}
              </h3>
              <div className='text-mogazoa-12px-300 md:text-mogazoa-14px-300 xl:text-mogazoa-16px-300 flex flex-col text-[var(--color-gray-6e6e82)] md:flex-row md:justify-between'>
                <div className='mb-[5px]'>
                  <span className='mr-2.5'>후기 {movie.reivewCount}</span>
                  <span>찜 {movie.favoriteCount}</span>
                </div>

                <div className='text-[var(--color-gray-9fa6b2)]'>
                  <StarIcon className='mr-[2px] inline-block h-3 w-3' />

                  {movie.averageRating}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductList;
