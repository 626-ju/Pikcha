export interface productCard {
  id: number;
  name: string;
  // image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
}

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
