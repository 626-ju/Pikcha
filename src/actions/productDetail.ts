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

  // 전체 상품 목록과 해당 카테고리 상품 목록 업데이트
  revalidateTag('products');
  revalidateTag('products-list');
  revalidateTag(`category-${categoryId}`);

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

  // 제품 상세, 전체 목록, 해당 카테고리 목록 업데이트
  revalidateTag(`products-${productId}`);
  revalidateTag('products');
  revalidateTag('products-list');
  revalidateTag(`category-${data.categoryId}`);

  return res;
};

export const deleteProduct = async (productId: number) => {
  const session = await auth();
  const accessToken = session?.accessToken;

  // 삭제하기 전에 제품 정보를 가져와서 카테고리 ID를 확인
  let categoryId: number | null = null;
  try {
    const productDetail = await getProductDetail(productId);
    categoryId = productDetail.categoryId;
  } catch {
    // 제품 정보를 가져올 수 없어도 삭제는 진행
  }

  const res = await fetcher(`${BASE_URL}/${TEAM_ID}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  // 전체 목록, 랭킹, 해당 카테고리 목록 업데이트
  revalidateTag('products');
  revalidateTag('products-ranking');
  revalidateTag('products-list');
  if (categoryId) {
    revalidateTag(`category-${categoryId}`);
  }

  return res;
};
