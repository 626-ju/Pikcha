'use server';

import fetcher from '@/lib/utils/fetcher';
import { ReviewDetail } from '@/types/review/review';

const API_BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.TEST_TEAM_ID;

export const getProductReviews = async (
  productId: number,
  option: string = 'recent',
): Promise<ReviewDetail[]> => {
  const productReviews = await fetcher(
    `${API_BASE_URL}/${TEAM_ID}/products/${productId}/reviews?order=${option}`,
    {
      method: 'GET',
      next: { revalidate: 300, tags: [`${productId}`, `${option}`] },
    },
  );
  return productReviews.list;
};
