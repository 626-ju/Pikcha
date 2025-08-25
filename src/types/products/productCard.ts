export interface Product {
  updatedAt?: string;
  createdAt?: string;
  writerId?: number;
  categoryId?: number;
  favoriteCount: number;
  reviewCount: number;
  rating: number;
  image: string;
  name: string;
  id: number;
}
