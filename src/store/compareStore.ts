import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Product } from '@/types/product/productType';

interface CompareState {
  compareList: Product[];
  addProduct: (product: Product) => { removedProduct?: Product };
  removeProduct: (productId: number) => void;
  clearCompareList: () => void;
  isProductInList: (productId: number) => boolean;
  undoRemove: (removedProduct: Product, newProduct: Product) => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      compareList: [],

      addProduct: (product: Product) => {
        const { compareList } = get();

        // 이미 있는 상품인지 확인
        if (compareList.some((p) => p.id === product.id)) {
          return {};
        }

        let newList = [...compareList, product];
        let removedProduct: Product | undefined;

        // 최대 4개 제한, FIFO(가장 앞의 상품부터 제거) 방식
        if (newList.length > 4) {
          removedProduct = newList[0];
          newList = newList.slice(1);
        }

        set({ compareList: newList });
        return { removedProduct };
      },

      removeProduct: (productId: number) => {
        set((state) => ({
          compareList: state.compareList.filter((p) => p.id !== productId),
        }));
      },

      clearCompareList: () => {
        set({ compareList: [] });
      },

      isProductInList: (productId: number) => {
        return get().compareList.some((p) => p.id === productId);
      },

      undoRemove: (removedProduct: Product, newProduct: Product) => {
        const { compareList } = get();
        // 새로 추가된 상품 제거하고 삭제된 상품을 맨 앞에 복원
        const listWithoutNew = compareList.filter((p) => p.id !== newProduct.id);
        set({ compareList: [removedProduct, ...listWithoutNew] });
      },
    }),
    {
      name: 'compare-storage',
    },
  ),
);
