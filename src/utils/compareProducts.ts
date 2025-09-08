import { ComparisonResult } from '@/types/compare/compareType';
import { Product } from '@/types/product/productType';

// 승자를 뽑고, 승자가 없으면 null
function pickWinner(a: number, b: number, p1: Product, p2: Product): Product | null {
  if (a === b) return null;
  return a > b ? p1 : p2;
}

export function compareProducts(product1: Product, product2: Product): ComparisonResult {
  // 항목별 승자 판별
  const ratingWinner = pickWinner(product1.rating, product2.rating, product1, product2);
  const favoriteWinner = pickWinner(
    product1.favoriteCount,
    product2.favoriteCount,
    product1,
    product2,
  );
  const reviewWinner = pickWinner(product1.reviewCount, product2.reviewCount, product1, product2);

  // 총 승수 집계 (비교 후 1승씩 추가)
  let product1Wins = 0;
  let product2Wins = 0;

  for (const w of [ratingWinner, favoriteWinner, reviewWinner]) {
    if (!w) continue;
    if (w.id === product1.id) product1Wins++;
    else product2Wins++;
  }

  // 승자 판정
  const isDraw = product1Wins === product2Wins;
  const winner = isDraw ? null : product1Wins > product2Wins ? product1 : product2;
  const loser = isDraw ? null : winner?.id === product1.id ? product2 : product1;
  const winCount = Math.max(product1Wins, product2Wins);

  // 결과값 반환
  return {
    winner,
    loser,
    winCount,
    isDraw,
    product1Wins,
    product2Wins,
    details: {
      rating: { winner: ratingWinner, value1: product1.rating, value2: product2.rating },
      favoriteCount: {
        winner: favoriteWinner,
        value1: product1.favoriteCount,
        value2: product2.favoriteCount,
      },
      reviewCount: {
        winner: reviewWinner,
        value1: product1.reviewCount,
        value2: product2.reviewCount,
      },
    },
  };
}
