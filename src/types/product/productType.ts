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
