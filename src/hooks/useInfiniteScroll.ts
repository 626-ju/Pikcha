'use client';

import { useCallback, useState, useTransition, useRef } from 'react';

import { useIntersectionObserver } from './useIntersectionObserver';

interface InfiniteScrollOptions<T> {
  initialData: T[];
  initialCursor: number | null;
  fetcher: (cursor: number | null) => Promise<{ list: T[]; nextCursor: number | null }>;
}

export function useInfiniteScroll<T>({
  initialData,
  initialCursor,
  fetcher,
}: InfiniteScrollOptions<T>) {
  const [items, setItems] = useState<T[]>(initialData);
  const [cursor, setCursor] = useState<number | null>(initialCursor);
  const [isPending, startTransition] = useTransition();
  const triggerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (isPending || cursor === null) return;

    startTransition(async () => {
      try {
        const result = await fetcher(cursor);
        setItems((prev) => [...prev, ...result.list]);
        setCursor(result.nextCursor);
      } catch (error) {
        console.error('Failed to load more items:', error);
      }
    });
  }, [cursor, isPending, fetcher]);

  const reset = useCallback(() => {
    startTransition(async () => {
      try {
        const result = await fetcher(null);
        setItems(result.list);
        setCursor(result.nextCursor);
      } catch (error) {
        console.error('Failed to reset items:', error);
      }
    });
  }, [fetcher]);

  useIntersectionObserver(triggerRef, cursor, loadMore);

  return {
    items,
    cursor,
    isPending,
    triggerRef,
    hasMore: cursor !== null,
    reset,
  };
}
