import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { MAX_COMPARE_ITEMS } from '@/constants/compareNumber';

interface CompareState {
  compareList: number[];
  shouldAutoSelect: boolean;
  addProduct: (productId: number) => { shouldShowModal: boolean; isDuplicate: boolean };
  addProductWithRemoval: (productId: number, removeProductId: number) => void;
  removeProduct: (productId: number) => void;
  clearCompareList: () => void;
  setShouldAutoSelect: (value: boolean) => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      compareList: [],
      shouldAutoSelect: false,

      addProduct: (productId: number) => {
        const { compareList } = get();

        // 이미 있는 상품인지 확인
        if (compareList.includes(productId)) {
          return { shouldShowModal: false, isDuplicate: true };
        }

        // 최대 개수에 도달한 경우 모달을 표시해야 함
        if (compareList.length >= MAX_COMPARE_ITEMS) {
          return { shouldShowModal: true, isDuplicate: false };
        }

        // 공간이 있으면 바로 추가
        set({ compareList: [...compareList, productId] });
        return { shouldShowModal: false, isDuplicate: false };
      },

      addProductWithRemoval: (productId: number, removeProductId: number) => {
        const { compareList } = get();
        set({ compareList: [...compareList.filter((id) => id !== removeProductId), productId] });
      },

      removeProduct: (productId: number) => {
        set((state) => ({
          compareList: state.compareList.filter((id) => id !== productId),
        }));
      },

      clearCompareList: () => {
        set({ compareList: [] });
      },

      setShouldAutoSelect: (value: boolean) => {
        set({ shouldAutoSelect: value });
      },
    }),
    {
      name: 'compare-storage',
    },
  ),
);
