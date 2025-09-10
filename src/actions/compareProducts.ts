'use server';

import fetcher from '@/lib/utils/fetcher';
import { ProductDetail } from '@/types/product/productType';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.TEST_TEAM_ID;

export const getBatchProductDetails = async (productIds: number[]): Promise<ProductDetail[]> => {
  const productPromises = productIds.map(async (id) => {
    try {
      return await fetcher(`${BASE_URL}/${TEAM_ID}/products/${id}`, {
        method: 'GET',
        cache: 'force-cache',
        next: { revalidate: 30 },
      });
    } catch {
      return null;
    }
  });

  const results = await Promise.all(productPromises);
  return results.filter((product): product is ProductDetail => product !== null);
};
