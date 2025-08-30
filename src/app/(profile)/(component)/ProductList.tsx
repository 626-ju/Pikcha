'use client';

import { useCallback, useRef, useState } from 'react';

import Empty from '@/assets/icon/Icon-empty.svg';
import SortDropdown from '@/components/common/dropdowns/SortDropdown';
import ProductCard from '@/components/common/ProductCard';
import { SORT_OPTION_USER_PAGE } from '@/constants/ProductsConst';
import useFetchUserProductList from '@/hooks/useFetchUserProductList';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
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

  const { movieList, isFetching, fetchProducts, cursor, errOccur } = useFetchUserProductList(
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
        <div className='hidden gap-10 xl:flex'>
          {SORT_OPTION_USER_PAGE.map(({ value, name }) => (
            <button
              key={`tab-${value}`}
              className={cn('text-gray-6e6e82', value === option && 'text-white-f1f1f5')}
              onClick={() => setOption(value)}
            >
              {name}
            </button>
          ))}
        </div>
        <SortDropdown
          variant={'user'}
          menuPosition='left'
          className='xl:hidden'
          onChange={onValueChange}
        />
      </div>
      <ul className='flex max-w-[940px] flex-wrap gap-[15px] xl:gap-5'>
        {movieList?.length !== 0 ? (
          movieList?.map((movie) => {
            return (
              <li key={movie.id}>
                <ProductCard movie={movie} />
              </li>
            );
          })
        ) : (
          <div className='m-auto mt-15 h-60 w-60'>
            <Empty />
            <p className='text-mogazoa-24px-400 mt-6 text-center'>
              {errOccur ? '잠시 후에 시도해주세요' : '목록이 없습니다'}
            </p>
          </div>
        )}
        {cursor !== null && errOccur === false && (
          <div ref={loadMoreRef} className='h-[5px] w-4'></div>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
