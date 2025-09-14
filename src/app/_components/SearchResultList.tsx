'use client';

import { useState, useCallback, useEffect } from 'react';

import { searchProducts } from '@/actions/productList';
import SortDropdown from '@/components/common/dropdowns/SortDropdown';
import ProductCard from '@/components/common/ProductCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { Product } from '@/types/product/productType';

import ProductList from './ProductList';

interface SearchResultListProps {
  initialProducts: Product[];
  initialCursor: number | null;
  searchParams: {
    q?: string;
    category?: number | null;
  };
}

export default function SearchResultList({
  initialProducts,
  initialCursor,
  searchParams,
}: SearchResultListProps) {
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'reviewCount'>('recent');

  const fetcher = useCallback(
    async (cursor: number | null) => {
      const result = await searchProducts({
        q: searchParams.q,
        category: searchParams.category,
        cursor,
        order: sortBy,
      });
      return {
        list: result.list,
        nextCursor: result.nextCursor,
      };
    },
    [searchParams.q, searchParams.category, sortBy],
  );

  const { items, triggerRef, isPending, hasMore, reset } = useInfiniteScroll({
    initialData: initialProducts,
    initialCursor,
    fetcher,
  });

  useEffect(() => {
    reset();
  }, [sortBy, reset]);

  // 상품 등록/수정/삭제 시 목록 새로고침을 위한 이벤트 리스너
  useEffect(() => {
    const handleProductUpdate = () => {
      reset();
    };

    window.addEventListener('productUpdated', handleProductUpdate);
    return () => {
      window.removeEventListener('productUpdated', handleProductUpdate);
    };
  }, [reset]);

  const handleSortChange = (value: string) => {
    setSortBy(value as 'recent' | 'rating' | 'reviewCount');
  };

  return (
    <div className='relative'>
      <div className='top-[100px] z-50 mb-4 flex justify-end md:sticky md:top-[150px] xl:top-[170px]'>
        <SortDropdown
          variant='product'
          option={sortBy}
          onChange={handleSortChange}
          menuPosition='right'
        />
      </div>
      <ProductList>
        {items.map((product) => (
          <ProductCard key={product.id} movie={product} />
        ))}
      </ProductList>

      {hasMore && (
        <div ref={triggerRef} className='flex justify-center py-4'>
          {isPending ? <div className='text-gray-6e6e82'>로딩 중...</div> : <div className='h-4' />}
        </div>
      )}
    </div>
  );
}
