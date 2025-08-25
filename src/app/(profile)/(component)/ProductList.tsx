import ProductCard from '@/components/common/ProductCard';

import DropdownTrigger from './DropdownTrigger';

interface Props {
  userid?: string;
}

const ProductList = ({ userid }: Props) => {
  // //{teamId}/users/{userId}/reviewed-products | favorite-products | created-products
  //초기값 위에서 받아서 그려야하나

  const movieList = [
    { id: 1, title: '곡성', reviewCount: 123, favoriteCount: 33, averageRating: 4.1 },
    { id: 2, title: '검은 사제들', reviewCount: 123, favoriteCount: 33, averageRating: 4.1 },
    { id: 3, title: '랑종', reviewCount: 123, favoriteCount: 33, averageRating: 4.1 },
    { id: 4, title: '인시디어스', reviewCount: 123, favoriteCount: 33, averageRating: 4.1 },
  ];

  return (
    <>
      {/* 추후에 지우겠습니다.(린트 회피용) */}
      <div className='sr-only'>{userid}</div>
      <DropdownTrigger />
      <ul className='flex max-w-[940px] flex-wrap gap-[15px] xl:gap-5'>
        {movieList.map((movie) => (
          <li key={movie.id}>
            <ProductCard movie={movie} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductList;
