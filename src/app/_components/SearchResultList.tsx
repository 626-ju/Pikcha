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

  const handleSortChange = (value: string) => {
    setSortBy(value as 'recent' | 'rating' | 'reviewCount');
  };

  return (
    <div className='relative'>
      <div className='absolute top-[-30px] right-0 z-10'>
        <SortDropdown variant='product' onChange={handleSortChange} menuPosition='right' />
      </div>
      <ProductList>
        {items.map((product) => (
          <ProductCard key={product.id} movie={product} />
        ))}
      </ProductList>

      {hasMore && (
        <div ref={triggerRef} className='flex justify-center py-4'>
          {isPending ? (
            <div className='text-gray-6e6e82'>로딩 중...</div> // 로딩 부분 구현 필요
          ) : (
            <div className='h-4' />
          )}
        </div>
      )}
    </div>
  );
}
