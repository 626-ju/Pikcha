export interface Product {
  updatedAt: string;
  createdAt: string;
  writerId: number;
  categoryId: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string;
  name: string;
  id: number;
}

export interface ProductListRes {
  nextCursor: number | null;
  list: Product[];
}

export interface ProductSearch {
  q?: string;
  category?: number | null;
  cursor?: number | null;
  order?: 'recent' | 'rating' | 'reviewCount' | null;
}
