import { useCallback, useEffect, useRef, useState } from 'react';

import { Product } from '@/types/product/productType';

type Mode = 'browse' | 'delete' | 'compare';

type ControllerDeps = {
  compareList: Product[];
  removeProduct: (id: number) => void;
  clearCompareList: () => void;
};

export function useCompareController({
  compareList,
  removeProduct,
  clearCompareList,
}: ControllerDeps) {
  const [mode, setMode] = useState<Mode>('browse');

  // 선택 상태(id값) 관리
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [selectedDeleteIds, setSelectedDeleteIds] = useState<Set<number>>(new Set());

  // '비교하러가기' 버튼으로 진입 시 최초 1회 목록 내 마지막 2개 자동 선택
  const didAutoFill = useRef(false);
  useEffect(() => {
    if (!didAutoFill.current && compareList.length >= 2) {
      const lastTwo = compareList.slice(-2).map((p) => p.id);
      setSelectedDeleteIds(new Set(lastTwo));
      didAutoFill.current = true;
    }
  }, [compareList]);

  // 비교 목록이 변할 때 존재하지 않는 id 정리
  useEffect(() => {
    if (selectedIds.size === 0 && selectedDeleteIds.size === 0) return;

    const existing = new Set(compareList.map((p) => p.id));
    setSelectedIds((prev) => {
      if (prev.size === 0) return prev;
      const next = new Set<number>();
      prev.forEach((id) => existing.has(id) && next.add(id));
      return next;
    });
    setSelectedDeleteIds((prev) => {
      if (prev.size === 0) return prev;
      const next = new Set<number>();
      prev.forEach((id) => existing.has(id) && next.add(id));
      return next;
    });
  }, [compareList, selectedIds.size, selectedDeleteIds.size]);

  // 모드에 따른 카드 클릭 동작
  const handleCardSelect = useCallback(
    (product: Product) => {
      if (mode === 'delete') {
        setSelectedDeleteIds((prev) => {
          const next = new Set(prev);
          if (next.has(product.id)) next.delete(product.id);
          else next.add(product.id);
          return next;
        });
        return;
      } // browse/compare: 비교 선택(최대 2개 유지)
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(product.id)) {
          next.delete(product.id);
          return next;
        }
        if (next.size >= 2) {
          // 가장 먼저 들어온 id 제거
          const [first] = next;
          next.delete(first);
        }
        next.add(product.id);
        return next;
      });
    },
    [mode],
  );

  // 입력 영역에서 선택 제거
  const handleProductRemoveFromSelected = useCallback((productId: number) => {
    setSelectedIds((prev) => {
      if (!prev.has(productId)) return prev;
      const next = new Set(prev);
      next.delete(productId);
      return next;
    });
  }, []);

  // 비교모드 시작/종료
  const handleCompare = useCallback(() => {
    if (selectedIds.size === 2) setMode('compare');
  }, [selectedIds.size]);

  const backToBrowse = useCallback(() => {
    setMode('browse');
  }, []);

  // 삭제 모드
  const enterDeleteMode = useCallback(() => {
    setMode('delete');
    setSelectedDeleteIds(new Set());
  }, []);

  const exitDeleteMode = useCallback(() => {
    setMode('browse');
    setSelectedDeleteIds(new Set());
  }, []);

  const confirmDeleteSelected = useCallback(() => {
    if (selectedDeleteIds.size === 0) return;
    selectedDeleteIds.forEach((id) => removeProduct(id));
    setSelectedDeleteIds(new Set());
    setMode('browse');

    // 삭제된 항목이 비교 선택에 남지 않게 정리
    setSelectedIds((prev) => {
      if (prev.size === 0) return prev;
      const next = new Set<number>();
      prev.forEach((id) => {
        if (!selectedDeleteIds.has(id)) next.add(id);
      });
      return next;
    });
  }, [removeProduct, selectedDeleteIds]);

  // 전체 삭제
  const clearAll = useCallback(() => {
    clearCompareList();
    setSelectedIds(new Set());
    setSelectedDeleteIds(new Set());
    setMode('browse');
  }, [clearCompareList]);

  return {
    // state
    mode,
    selectedIds,
    selectedDeleteIds,

    // actions
    handleCardSelect,
    handleProductRemoveFromSelected,
    handleCompare,
    backToBrowse,

    enterDeleteMode,
    exitDeleteMode,
    confirmDeleteSelected,
    clearAll,
  };
}
