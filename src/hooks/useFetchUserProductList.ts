'use client';

import { useEffect, useState } from 'react';

import { getUserProducts } from '@/actions/profile/getUserProducts';
import { Product } from '@/types/product/productType';

export const useFetchUserProductList = (userid: number, option: string, initialData: Product[]) => {
  const [movieList, setMovieList] = useState(initialData);
  const [isFetching, setIsFetching] = useState(false);
  const [cursor, setCursor] = useState<number | null>(0);

  const fetchProducts = async () => {
    if (cursor === null || isFetching) return;

    try {
      setIsFetching(true);

      const data = await getUserProducts(userid, option, cursor);
      setMovieList((prev) => [...(prev ?? []), ...data.list]);

      //cursor 업데이트
      setCursor(() => data.nextCursor);
    } catch (err) {
      console.log(err);
      setMovieList([]);
    } finally {
      setIsFetching(false);
    }
  };

  //옵션 바뀔 때
  useEffect(() => {
    const fetchOptionChange = async () => {
      setIsFetching(true);

      try {
        const data = await getUserProducts(userid, option, cursor ?? 0);
        setMovieList(data.list);
        setCursor(data.nextCursor);
      } catch (err) {
        console.log(err);
        setMovieList([]);
      } finally {
        setIsFetching(false);
      }
    };

    fetchOptionChange();
  }, [option, userid]);

  return { movieList, isFetching, fetchProducts, cursor };
};

export default useFetchUserProductList;
