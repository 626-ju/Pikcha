'use server';
import 'server-only';
import fetcher from '@/lib/utils/fetcher';
import { ProductListRes, ProductSearch } from '@/types/products/productList';

// 상품 검색을 위한 api 호출
// .env 내 teamId 환경 변수로 포함되어 있음.
const API_BASE_URL = process.env.API_BASE_URL ?? '';
const TEAM_ID = process.env.TEAM_ID ?? '';

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  return await fetcher(`${API_BASE_URL}/${TEAM_ID}${path}`, {
    ...init,
    next: { revalidate: 30 },
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
  });
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
  return api<ProductListRes>(url);
}

// 검색창 검색 시 검색창 하단에 추천 리스트를 보여주는 서버 액션
// 자동완성 목록은 최대 8개까지만 표시
// 너무 많은 결과로 인한 가독성 저하 방지, 리스트 높이를 제한해 레이아웃/스타일 안정성 유지
type SuggestionProduct = { id: number; name: string; categoryId: number };
type SuggestionProductListRes = { list: SuggestionProduct[] };

const fetchByKeyword = async (keyword: string): Promise<SuggestionProduct[]> => {
  const qs = new URLSearchParams({ keyword }).toString();
  try {
    const res = await api<SuggestionProductListRes>(`/products?${qs}`);
    return res.list ?? [];
  } catch {
    return [];
  }
};

export async function suggestProducts(q: string, limit = 8): Promise<SuggestionProduct[]> {
  if (!q.trim()) return [];

  // 케이스 변형 세트 만들기(중복 제거)
  const variants = Array.from(
    new Set([
      q,
      q.toLowerCase(),
      q.toUpperCase(),
      q.charAt(0).toUpperCase() + q.slice(1).toLowerCase(),
    ]),
  );

  // 1) 원본 먼저
  const resultsMap = new Map<number, SuggestionProduct>();
  const pushUnique = (items: SuggestionProduct[]) => {
    for (const p of items) {
      if (!resultsMap.has(p.id)) resultsMap.set(p.id, p);
      if (resultsMap.size >= limit) break;
    }
  };

  // 원본 호출
  const first = await fetchByKeyword(variants[0]);
  pushUnique(first);

  // 2) 부족하면 나머지 케이스를 순차 보강
  let i = 1;
  while (resultsMap.size < limit && i < variants.length) {
    const items = await fetchByKeyword(variants[i]);
    pushUnique(items);
    i++;
  }

  // 3) 최종적으로 클라에서 대소문자 무시 필터
  const final = Array.from(resultsMap.values())
    .filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
    .slice(0, limit);

  return final;
}
