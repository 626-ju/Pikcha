import { create } from 'zustand';

import { ProductDetail } from '@/types/product/productType';

// 빈 Product 초기값
const emptyProduct: ProductDetail = {
  id: 0,
  name: '',
  description: '',
  image: '',
  rating: 0,
  reviewCount: 0,
  favoriteCount: 0,
  categoryId: 0,
  createdAt: '', //ISO 8601 형식
  updatedAt: '', //ISO 8601 형식
  writerId: 0,
  isFavorite: false,
  category: {
    id: 0,
    name: '',
  },
  categoryMetric: {
    rating: 0,
    favoriteCount: 0,
    reviewCount: 0,
  },
};

interface CurrentProductDetailState {
  product: ProductDetail;
  setProduct: (product: ProductDetail) => void;
  clearProduct: () => void;
}

export const useCurrentProductStore = create<CurrentProductDetailState>((set) => ({
  product: emptyProduct,
  setProduct: (product) => set({ product }),
  clearProduct: () => set({ product: emptyProduct }),
}));
