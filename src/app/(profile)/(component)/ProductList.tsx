'use client';

import { useCallback, useRef, useState } from 'react';

import Empty from '@/assets/icon/Icon-empty.svg';
import SortDropdown from '@/components/common/dropdowns/SortDropdown';
import ProductCard from '@/components/common/ProductCard';
import useFetchUserProductList from '@/hooks/useFetchUserProductList';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Product } from '@/types/product/productType';

interface Props {
  userid: number;
  initialData: Product[];
}

const ProductList = ({ userid, initialData }: Props) => {
  const [option, setOption] = useState('reviewed-products');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const onValueChange = (value: string) => {
    setOption(value);
  };

  const { movieList, isFetching, fetchProducts, cursor } = useFetchUserProductList(
    userid,
    option,
    initialData,
  );

  const onIntersect = useCallback(() => {
    if (!isFetching && cursor !== null) fetchProducts();
    // eslint-disable-next-line
  }, [cursor, isFetching]);

  useIntersectionObserver(loadMoreRef, cursor, onIntersect);

  return (
    <div className='mb-30 md:mb-15'>
      <div className='text-mogazoa-18px-600 mt-15 mb-7.5 xl:mt-20'>
        <SortDropdown variant={'user'} onChange={onValueChange} menuPosition='left' />
      </div>
      <ul className='flex max-w-[940px] flex-wrap gap-[15px] xl:gap-5'>
        {movieList?.length !== 0 ? (
          movieList?.map((movie) => (
            <li key={movie.id}>
              <ProductCard movie={movie} />
            </li>
          ))
        ) : (
          <div className='m-auto mt-15 h-60 w-60'>
            <Empty />
            <p className='text-mogazoa-24px-400 mt-6 text-center'>목록이 없습니다</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
