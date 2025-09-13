import { useCallback, useEffect, useMemo, useState } from 'react';

import { useCompareStore } from '@/store/compareStore';
import { useModalStore } from '@/store/modalStore';
import { type ProductDetail } from '@/types/product/productType';

type Mode = 'browse' | 'delete' | 'compare';

type ControllerDeps = {
  compareList: number[];
  removeProduct: (id: number) => void;
  clearCompareList: () => void;
  compareProducts: ProductDetail[];
};

export function useCompareController({
  compareList,
  removeProduct,
  clearCompareList,
  compareProducts,
}: ControllerDeps) {
  const { shouldAutoSelect, setShouldAutoSelect } = useCompareStore();
  const { openModal } = useModalStore();
  const [mode, setMode] = useState<Mode>('browse');

  // 선택 상태(id값) 관리
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedDeleteIds, setSelectedDeleteIds] = useState<number[]>([]);
  // 인풋에서 선택된 상품 (슬롯 0/1)
  const [inputProducts, setInputProducts] = useState<(ProductDetail | null)[]>([null, null]);

  // id -> product 매핑
  const idMap = useMemo(() => new Map(compareProducts.map((p) => [p.id, p])), [compareProducts]);

  // '비교하러가기' 버튼으로 진입 시 마지막 2개 자동 선택
  useEffect(() => {
    if (shouldAutoSelect && compareList.length >= 2) {
      const lastTwo = compareList.slice(-2);
      setSelectedIds(lastTwo);
      setShouldAutoSelect(false); // 사용 후 초기화
    }
  }, [shouldAutoSelect, compareList, setShouldAutoSelect]);

  // 비교 목록이 변할 때 존재하지 않는 id 정리
  useEffect(() => {
    if (selectedIds.length === 0 && selectedDeleteIds.length === 0) return;

    const filterIds = (prev: number[]) => {
      if (prev.length === 0) return prev;
      const filtered = prev.filter((id) => compareList.includes(id));
      return filtered.length !== prev.length ? filtered : prev;
    };

    setSelectedIds(filterIds);
    setSelectedDeleteIds(filterIds);
  }, [compareList, selectedIds.length, selectedDeleteIds.length]);

  // 슬롯 계산: 인풋 고정 → 선택된 id로 빈 슬롯 채우기
  const selectedProducts = useMemo<(ProductDetail | null)[]>(() => {
    const slots: (ProductDetail | null)[] = [inputProducts[0], inputProducts[1]];
    for (const id of selectedIds) {
      const found = idMap.get(id) ?? null;
      if (!found) continue;
      if (slots.some((s) => s && s.id === found.id)) continue;
      const empty = slots.findIndex((s) => s === null);
      if (empty !== -1) slots[empty] = found;
    }
    return slots;
  }, [inputProducts, selectedIds, idMap]);

  // 결과 쌍: 슬롯에 2개 제품이 모두 있으면 비교 가능
  const comparePair = useMemo<[ProductDetail, ProductDetail] | null>(() => {
    const slot0 = selectedProducts[0];
    const slot1 = selectedProducts[1];
    if (slot0 && slot1) return [slot0, slot1];
    return null;
  }, [selectedProducts]);

  const canCompare = !!comparePair;

  // 모드에 따른 카드 클릭 동작
  const handleCardSelect = useCallback(
    (productId: number) => {
      if (mode === 'delete') {
        setSelectedDeleteIds((prev) => {
          if (prev.includes(productId)) {
            return prev.filter((id) => id !== productId);
          } else {
            return [...prev, productId];
          }
        });
        return;
      } // browse/compare: 비교 선택(최대 2개 유지)
      setSelectedIds((prev) => {
        if (prev.includes(productId)) {
          return prev.filter((id) => id !== productId);
        }
        if (prev.length >= 2) {
          // 가장 먼저 들어온 id 제거
          return [prev[1], productId];
        }
        return [...prev, productId];
      });
    },
    [mode],
  );

  // CompareInput 전용: 특정 인덱스에 상품 설정
  const handleInputProductSelect = useCallback((productId: number, index: number) => {
    setSelectedIds((prev) => {
      const newIds = [...prev];
      newIds[index] = productId;
      return newIds;
    });
  }, []);

  // CompareInput 통합 선택: compareList에 있으면 selectedIds, 아니면 inputProducts 업데이트
  const handleInputSelect = useCallback(
    (product: ProductDetail, index: number) => {
      if (idMap.has(product.id)) {
        handleInputProductSelect(product.id, index);
        return;
      }
      setInputProducts((prev) => {
        const next = [...prev];
        next[index] = product;
        return next;
      });
    },
    [idMap, handleInputProductSelect],
  );

  // 슬롯 제거: 실제 슬롯에 표시된 출처에 따라 제거 처리
  const handleSlotRemove = useCallback(
    (index: number) => {
      const slot = selectedProducts[index];
      if (!slot) return;
      if (selectedIds.includes(slot.id)) {
        // 리스트 선택에서 온 경우 선택 해제
        setSelectedIds((prev) => prev.filter((id) => id !== slot.id));
      }
      // 인풋에서 온 경우에만 인풋 클리어
      setInputProducts((prev) => {
        const next = [...prev];
        if (prev[index]?.id === slot.id) next[index] = null;
        return next;
      });
    },
    [selectedProducts, selectedIds],
  );

  // 비교모드 시작/종료
  const handleCompare = useCallback(() => {
    if (comparePair) setMode('compare');
  }, [comparePair]);

  // 선택 상태만 초기화
  const resetSelection = useCallback(() => {
    setSelectedIds([]);
    setSelectedDeleteIds([]);
    setInputProducts([null, null]);
  }, []);

  const backToBrowse = useCallback(() => {
    setMode('browse');
    resetSelection();
  }, [resetSelection]);

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
    setSelectedIds((prev) => prev.filter((id) => !selectedDeleteIds.includes(id)));
  }, [removeProduct, selectedDeleteIds]);

  // 전체 삭제
  const clearAll = useCallback(() => {
    clearCompareList();
    setSelectedIds([]);
    setSelectedDeleteIds([]);
    setInputProducts([null, null]);
    setMode('browse');
  }, [clearCompareList]);

  // 전체 삭제 확인 모달 열기
  const openClearAllModal = useCallback(async () => {
    const { default: ClearAllConfirmModal } = await import(
      '@/app/compare/components/ClearAllConfirmModal'
    );
    openModal({
      component: ClearAllConfirmModal,
      props: { onConfirm: clearAll },
    });
  }, [openModal, clearAll]);

  return {
    // state
    mode,
    selectedIds,
    selectedDeleteIds,
    inputProducts,
    selectedProducts,
    comparePair,
    canCompare,

    // actions
    handleCardSelect,
    handleInputProductSelect,
    handleInputSelect,
    handleSlotRemove,
    handleCompare,
    backToBrowse,
    enterDeleteMode,
    exitDeleteMode,
    confirmDeleteSelected,
    clearAll,
    openClearAllModal,
    resetSelection,
  };
}
