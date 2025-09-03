'use server';

import { revalidateTag } from 'next/cache';

import fetcher from '@/lib/utils/fetcher';
import { ProductFormValue } from '@/types/product/productSchema';
import { ProductDetail } from '@/types/product/productType';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.TEST_TEAM_ID;
const accessToken = process.env.SERVER_TEMP_ACCESSTOKEN;

export const getProductDetail = async (productId: number): Promise<ProductDetail> => {
  const productDetail = await fetcher(`${BASE_URL}/${TEAM_ID}/products/${productId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 300, tags: [`products-${productId}`] },
  });
  return productDetail;
};

export const postProduct = async ({ categoryId, image, description, name }: ProductFormValue) => {
  const newProduct = {
    categoryId,
    image: image?.[0],
    description,
    name,
  };

  const res = await fetcher(`${BASE_URL}/${TEAM_ID}/products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  });

  revalidateTag(`products`);

  return res;
};
