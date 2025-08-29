'use client';

import { useCallback, useEffect, useState } from 'react';

import { getUserProducts } from '@/actions/profile/getUserProducts';
import Empty from '@/assets/icon/Icon-empty.svg';
import ProductCard from '@/components/common/ProductCard';
import { Product } from '@/types/product/productType';

interface Props {
  userid: number;
  initailData: Product[];
}

const ProductList = ({ userid, initailData }: Props) => {
  const [movieList, setMovieList] = useState(initailData);
  const [option, setOption] = useState('created-products');

  const onValueChange = (value: string) => {
    setOption(value);
  };

  //드랍다운에 넘겨줄 수 있게 되면 삭제.
  console.log(onValueChange);

  const fetchProductsByOption = useCallback(async () => {
    const data = await getUserProducts(userid, option);
    setMovieList(data.list);
  }, [userid, option]);

  useEffect(() => {
    fetchProductsByOption();
  }, [fetchProductsByOption]);

  return (
    <>
      <div className='text-mogazoa-18px-600 mt-15 mb-7.5 xl:mt-20'>드랍다운 자리</div>
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
    </>
  );
};

export default ProductList;
