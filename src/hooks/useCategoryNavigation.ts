'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export const useCategoryNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateToCategory = (category: number | null, query?: string) => {
    const next = new URLSearchParams(searchParams);

    if (category !== null) {
      next.set('categoryId', String(category));
    } else {
      next.delete('categoryId');
    }

    next.delete('cursor'); // 카테고리 변경 시 커서 초기화

    if (query) {
      next.set('q', query);
    } else {
      const currentQuery = searchParams.get('q');
      if (currentQuery) {
        next.set('q', currentQuery);
      } else {
        next.delete('q');
      }
    }

    router.push(`/?${next.toString()}`);
  };

  return { navigateToCategory };
};
