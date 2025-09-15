'use client';

import { useEffect, useState } from 'react';

import { Product } from '@/types/product/productType';

export const useFetchUserProductList = (userid: number, option: string, initialData: Product[]) => {
  const [productList, setProductList] = useState(initialData);
  const [isFetching, setIsFetching] = useState(false);
  const [cursor, setCursor] = useState<number | null>(0);
  const [errOccur, setErrOccur] = useState(false);

  const fetchProducts = async () => {
    if (cursor === null || isFetching) return;

    try {
      setIsFetching(true);

      const data = await fetch(
        `/api/profile/product-info?userid=${userid}&option=${option}&cursor=${cursor}`,
      ).then((res) => res.json());
      setProductList((prev) => [...(prev ?? []), ...data.list]);

      //cursor 업데이트
      setCursor(() => data.nextCursor);
    } catch (err) {
      console.log(err);
      setErrOccur(true);
      setProductList([]);
    } finally {
      setIsFetching(false);
    }
  };

  //옵션 바뀔 때
  useEffect(() => {
    const fetchOptionChange = async () => {
      setIsFetching(true);
      try {
        const data = await fetch(
          `/api/profile/product-info?userid=${userid}&option=${option}&cursor=${0}`,
        ).then((res) => res.json());
        setProductList(data.list);
        setCursor(data.nextCursor);
      } catch (err) {
        console.log(err);
        setErrOccur(true);
        setProductList([]);
      } finally {
        setIsFetching(false);
      }
    };

    fetchOptionChange();
    // 여기에 커서는 들어가면 안도ㅒ!
  }, [option, userid]);

  return { productList, isFetching, fetchProducts, cursor, errOccur };
};

export default useFetchUserProductList;
