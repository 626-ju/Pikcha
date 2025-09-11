import { ComparisonResult } from '@/types/compare/compareType';
import { ProductDetail } from '@/types/product/productType';

// 승자를 뽑고, 승자가 없으면 null
function pickWinner(
  a: number,
  b: number,
  p1: ProductDetail,
  p2: ProductDetail,
): ProductDetail | null {
  if (a === b) return null;
  return a > b ? p1 : p2;
}

export function compareProducts(
  product1: ProductDetail,
  product2: ProductDetail,
): ComparisonResult {
  // 항목별 승자 판별
  const ratingWinner = pickWinner(product1.rating, product2.rating, product1, product2);
  const favoriteWinner = pickWinner(
    product1.favoriteCount,
    product2.favoriteCount,
    product1,
    product2,
  );
  const reviewWinner = pickWinner(product1.reviewCount, product2.reviewCount, product1, product2);

  const winners = [ratingWinner, favoriteWinner, reviewWinner];

  // 총 승수 집계
  let product1Wins = 0;
  let product2Wins = 0;

  winners.forEach((winner) => {
    if (winner?.id === product1.id) product1Wins++;
    else if (winner?.id === product2.id) product2Wins++;
  });

  // 승자 판정
  const isDraw = product1Wins === product2Wins;
  const winner = isDraw ? null : product1Wins > product2Wins ? product1 : product2;
  const loser = winner ? (winner.id === product1.id ? product2 : product1) : null;
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
