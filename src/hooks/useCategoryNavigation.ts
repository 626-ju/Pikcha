'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export const useCategoryNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const navigateToCategory = (category: number | null, query?: string) => {
    const next = new URLSearchParams(searchParams.toString());
    const hadCategory = searchParams.has('categoryId');

    if (category !== null) {
      next.set('categoryId', String(category));
    } else {
      next.delete('categoryId');
    }

    // 카테고리 변경 시 커서 초기화
    next.delete('cursor');

    // 검색어 처리: 직접 전달된 query 우선, 없으면 기존 값을 유지, 둘 다 없으면 제거
    if (typeof query === 'string') {
      if (query) next.set('q', query);
      else next.delete('q');
    } else {
      const currentQuery = searchParams.get('q');
      if (currentQuery) next.set('q', currentQuery);
      else next.delete('q');
    }

    // 최종 URL 조합 (불필요한 '?' 방지)
    const qs = next.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;

    // 히스토리 정책: 처음 카테고리 적용만 push, 이후 변경/해제는 replace
    if (!hadCategory && category !== null) {
      router.push(url);
    } else {
      router.replace(url);
    }

    // 카테고리 변경 시 페이지 최상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { navigateToCategory };
};
