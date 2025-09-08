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
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedDeleteIds, setSelectedDeleteIds] = useState<number[]>([]);

  // '비교하러가기' 버튼으로 진입 시 최초 1회 목록 내 마지막 2개 자동 선택
  const didAutoFill = useRef(false);
  useEffect(() => {
    if (!didAutoFill.current && compareList.length >= 2) {
      const lastTwo = compareList.slice(-2).map((p) => p.id);
      setSelectedDeleteIds(lastTwo);
      didAutoFill.current = true;
    }
  }, [compareList]);

  // 비교 목록이 변할 때 존재하지 않는 id 정리
  useEffect(() => {
    if (selectedIds.length === 0 && selectedDeleteIds.length === 0) return;

    const existingIds = compareList.map((p) => p.id);
    setSelectedIds((prev) => {
      if (prev.length === 0) return prev;
      const filtered = prev.filter((id) => existingIds.includes(id));
      return filtered.length !== prev.length ? filtered : prev;
    });
    setSelectedDeleteIds((prev) => {
      if (prev.length === 0) return prev;
      const filtered = prev.filter((id) => existingIds.includes(id));
      return filtered.length !== prev.length ? filtered : prev;
    });
  }, [compareList, selectedIds.length, selectedDeleteIds.length]);

  // 모드에 따른 카드 클릭 동작
  const handleCardSelect = useCallback(
    (product: Product) => {
      if (mode === 'delete') {
        setSelectedDeleteIds((prev) => {
          if (prev.includes(product.id)) {
            return prev.filter((id) => id !== product.id);
          } else {
            return [...prev, product.id];
          }
        });
        return;
      } // browse/compare: 비교 선택(최대 2개 유지)
      setSelectedIds((prev) => {
        if (prev.includes(product.id)) {
          return prev.filter((id) => id !== product.id);
        }
        if (prev.length >= 2) {
          // 가장 먼저 들어온 id 제거
          return [prev[1], product.id];
        }
        return [...prev, product.id];
      });
    },
    [mode],
  );

  // 입력 영역에서 선택 제거
  const handleProductRemoveFromSelected = useCallback((productId: number) => {
    setSelectedIds((prev) => {
      if (!prev.includes(productId)) return prev;
      return prev.filter((id) => id !== productId);
    });
  }, []);

  // 비교모드 시작/종료
  const handleCompare = useCallback(() => {
    if (selectedIds.length === 2) setMode('compare');
  }, [selectedIds.length]);

  const backToBrowse = useCallback(() => {
    setMode('browse');
  }, []);

  // 삭제 모드
  const enterDeleteMode = useCallback(() => {
    setMode('delete');
    setSelectedDeleteIds([]);
  }, []);

  const exitDeleteMode = useCallback(() => {
    setMode('browse');
    setSelectedDeleteIds([]);
  }, []);

  const confirmDeleteSelected = useCallback(() => {
    if (selectedDeleteIds.length === 0) return;
    selectedDeleteIds.forEach((id) => removeProduct(id));
    setSelectedDeleteIds([]);
    setMode('browse');

    // 삭제된 항목이 비교 선택에 남지 않게 정리
    setSelectedIds((prev) => {
      if (prev.length === 0) return prev;
      return prev.filter((id) => !selectedDeleteIds.includes(id));
    });
  }, [removeProduct, selectedDeleteIds]);

  // 전체 삭제
  const clearAll = useCallback(() => {
    clearCompareList();
    setSelectedIds([]);
    setSelectedDeleteIds([]);
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
