import { ProductDetail } from '../product/productType';

export interface ComparisonResult {
  winner: ProductDetail | null;
  loser: ProductDetail | null;
  winCount: number;
  isDraw: boolean;
  product1Wins: number;
  product2Wins: number;
  details: {
    rating: { winner: ProductDetail | null; value1: number; value2: number };
    favoriteCount: { winner: ProductDetail | null; value1: number; value2: number };
    reviewCount: { winner: ProductDetail | null; value1: number; value2: number };
  };
}
