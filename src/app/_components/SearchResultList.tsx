'use client';

import { searchProducts } from '@/actions/productList';
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
  const { items, triggerRef, isPending, hasMore } = useInfiniteScroll({
    initialData: initialProducts,
    initialCursor,
    fetcher: async (cursor) => {
      const result = await searchProducts({
        q: searchParams.q,
        category: searchParams.category,
        cursor,
      });
      return {
        list: result.list,
        nextCursor: result.nextCursor,
      };
    },
  });

  return (
    <>
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
    </>
  );
}
