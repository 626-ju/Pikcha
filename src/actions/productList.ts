'use server';
import 'server-only';
import { Product, ProductListRes, ProductSearch } from '@/types/products/productList';

// 상품 검색을 위한 api 호출
// .env.local 내 teamId 환경 변수로 포함되어 있음.
// 검색, 추천 시 최신 결과가 중요하기 때문에 no-store 처리
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '';

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
  });
  if (!res.ok) throw new Error('API error');
  return res.json() as Promise<T>;
}

// 검색창으로 검색 시 검색 결과 요청(무한스크롤 지원)용 서버 액션
// 첫 요청은 cursor 생략, 이후 응답에 nextCursor를 cursor에 넣어 추가 로드
export async function searchProducts(params: ProductSearch) {
  const sp = new URLSearchParams();
  if (params.q) sp.set('keyword', params.q);
  if (params.category != null) sp.set('category', String(params.category));
  if (params.cursor != null) sp.set('cursor', String(params.cursor));
  if (params.order != null) sp.set('order', String(params.order));

  const url = `/products?${sp.toString()}`;
  console.log('API 호출 URL:', url);
  console.log('검색 파라미터:', params);

  return api<ProductListRes>(url);
}

// 검색창 검색 시 검색창 하단에 추천 리스트를 보여주는 서버 액션
// 자동완성 목록은 최대 8개까지만 표시
// 너무 많은 결과로 인한 가독성 저하 방지, 리스트 높이를 제한해 레이아웃/스타일 안정성 유지
export async function suggestProducts(q: string): Promise<Product[]> {
  if (!q) return [] as Product[];
  const sp = new URLSearchParams({ keyword: q });
  const data = await api<ProductListRes>(`/products?${sp.toString()}`);
  return data.list.slice(0, 8);
}
