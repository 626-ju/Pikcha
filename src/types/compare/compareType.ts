import { Product } from '../product/productType';

export interface ComparisonResult {
  winner: Product | null;
  loser: Product | null;
  winCount: number;
  isDraw: boolean;
  product1Wins: number;
  product2Wins: number;
  details: {
    rating: { winner: Product | null; value1: number; value2: number };
    favoriteCount: { winner: Product | null; value1: number; value2: number };
    reviewCount: { winner: Product | null; value1: number; value2: number };
  };
}
