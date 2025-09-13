'use server';
import 'server-only';
import fetcher from '@/lib/utils/fetcher';
import { ProductListRes } from '@/types/products/productList';

// 상품 검색을 위한 api 호출
// .env 내 teamId 환경 변수로 포함되어 있음.
const API_BASE_URL = process.env.API_BASE_URL ?? '';
const TEAM_ID = process.env.TEST_TEAM_ID ?? '';

// 랭킹은 1시간마다 캐싱, 태그를 통한 즉시 갱신 가능
async function api<T>(path: string): Promise<T> {
  return await fetcher(`${API_BASE_URL}/${TEAM_ID}/${path}`, {
    method: 'GET',
    next: { revalidate: 3600, tags: ['products-ranking'] },
    headers: { 'Content-Type': 'application/json' },
  });
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
