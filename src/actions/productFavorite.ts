'use server';

import { revalidateTag } from 'next/cache';

import { auth } from '@/auth';
import fetcher from '@/lib/utils/fetcher';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEST_TEAM_ID;

export const postProductFavorite = async (productId: number, isCurrentlyFavorite: boolean) => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const method = isCurrentlyFavorite ? 'DELETE' : 'POST';

  const res = await fetcher(`${BASE_URL}/${TEAM_ID}/products/${productId}/favorite`, {
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300, tags: [`products-${productId}`] },
  });

  revalidateTag(`products-${productId}`);
  revalidateTag(`product-${productId}`);
  revalidateTag('compare-products');
  revalidateTag('products-ranking'); // 즐겨찾기 변경시 랭킹에도 영향

  return res;
};
