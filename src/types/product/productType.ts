export interface Product {
  title: string;
  averageRating: number;
  id: number;
  name?: string;
  description?: string;
  image?: string;
  rating?: number;
  reviewCount: number;
  favoriteCount: number;
  categoryId?: number;
  createdAt?: string;
  updatedAt?: string;
  writerId?: number;
  isFavorite?: boolean;
  category?: {
    id: number;
    name: string;
  };
  categoryMetric?: {
    rating: number;
    favoriteCount: number;
    reviewCount: number;
  };
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  categoryId: number;
  createdAt: string; //ISO 8601 형식
  updatedAt: string; //ISO 8601 형식
  writerId: number;
  isFavorite: boolean;
  category: {
    id: number;
    name: string;
  };
  categoryMetric: {
    rating: number;
    favoriteCount: number;
    reviewCount: number;
  };
}

export interface CalculationMapProps {
  rating: (product: ProductDetail) => number;
  favorite: (product: ProductDetail) => number;
  review: (product: ProductDetail) => number;
}
