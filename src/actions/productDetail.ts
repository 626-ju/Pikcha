'use server';

import fetcher from '@/lib/utils/fetcher';
import { ProductDetail } from '@/types/product/productType';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.TEST_TEAM_ID;

export const getProductDetail = async (productId: number): Promise<ProductDetail> => {
  const productDetail = await fetcher(`${BASE_URL}/${TEAM_ID}/products/${productId}`, {
    method: 'GET',
    next: { revalidate: 300, tags: [`${productId}`] },
  });
  return productDetail;
};
