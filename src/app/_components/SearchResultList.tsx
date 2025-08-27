'use client';

import { searchProducts } from '@/actions/productList';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { Product } from '@/types/products/productList';

import ProductCard from './ProductCard';
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
          <ProductCard
            key={product.id}
            movie={{
              id: product.id,
              name: product.name,
              image: product.image,
              rating: product.rating ?? 0,
              reviewCount: product.reviewCount ?? 0,
              favoriteCount: product.favoriteCount ?? 0,
            }}
          />
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
