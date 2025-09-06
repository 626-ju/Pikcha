'use server';
import 'server-only';
import { ProductListRes } from '@/types/products/productList';

// 이 부분이 productList.ts 내 호출과 일치. 훅으로 분리 계획
// 상품 검색을 위한 api 호출
// .env 내 teamId 환경 변수로 포함되어 있음.
// 순위 확인 시 최신 결과가 중요하기 때문에 no-store 처리
const API_BASE_URL = process.env.API_BASE_URL ?? '';
const TEAM_ID = process.env.TEAM_ID ?? '';

async function api<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}/${TEAM_ID}/${path}`, {
    method: 'GET',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('API error');
  return res.json() as Promise<T>;
}

// 리뷰가 많은 순 (기본 6개)
// order에 reviewCount를 파라미터로 전달
export async function getTopReviewedProducts() {
  const sp = new URLSearchParams({ order: 'reviewCount' });
  const url = `products?${sp.toString()}`;
  const data = await api<ProductListRes>(url);

  return data.list.slice(0, 8);
}

// 별점이 높은 순 (기본 6개)
// order에 rating을 파라미터로 전달
export async function getTopRatingProducts() {
  const sp = new URLSearchParams({ order: 'rating' });
  const url = `products?${sp.toString()}`;
  const data = await api<ProductListRes>(url);

  return data.list.slice(0, 8);
}
