'use server';

import { revalidateTag } from 'next/cache';

import fetcher from '@/lib/utils/fetcher';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEST_TEAM_ID;
const accessToken = process.env.NEXT_PUBLIC_SERVER_TEMP_ACCESSTOKEN;

export const postProductFavorite = async (productId: number, isCurrentlyFavorite: boolean) => {
  const method = isCurrentlyFavorite ? 'DELETE' : 'POST';
  const res = await fetcher(`${BASE_URL}/${TEAM_ID}/products/${productId}/favorite`, {
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300, tags: [`product-${productId}`] },
  });

  revalidateTag(`products-${productId}`);

  return res;
};
