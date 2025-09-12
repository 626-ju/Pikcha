'use server';

import { revalidateTag } from 'next/cache';

import { auth } from '@/auth';
import fetcher from '@/lib/utils/fetcher';
import { ProductFormValue } from '@/types/product/productSchema';
import { ProductDetail } from '@/types/product/productType';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.TEST_TEAM_ID;

export const getProductDetail = async (productId: number): Promise<ProductDetail> => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const productDetail = await fetcher(`${BASE_URL}/${TEAM_ID}/products/${productId}`, {
    method: 'GET',
    headers,
    next: { revalidate: 300, tags: [`products-${productId}`] },
  });
  return productDetail;
};

export const postProduct = async ({ categoryId, image, description, name }: ProductFormValue) => {
  const session = await auth();
  const accessToken = session?.accessToken;

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

export const patchProduct = async ({
  productId,
  data,
}: {
  productId: number;
  data: ProductFormValue;
}) => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const newProduct = {
    categoryId: data.categoryId,
    image: data.image?.[0],
    description: data.description,
    name: data.name,
  };

  const res = await fetcher(`${BASE_URL}/${TEAM_ID}/products/${productId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  });

  revalidateTag(`products-${productId}`);

  return res;
};

export const deleteProduct = async (productId: number) => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const res = await fetcher(`${BASE_URL}/${TEAM_ID}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  return res;
};
