'use server';

import { revalidatePath } from 'next/cache';

import fetcher from '@/lib/utils/fetcher';
import { ReviewDetail, ReviewFormValue } from '@/types/review/review';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.TEST_TEAM_ID;
const accessToken = process.env.SERVER_TEMP_ACCESSTOKEN;

export const getProductReviews = async (
  productId: number,
  option: string = 'recent',
): Promise<ReviewDetail[]> => {
  const productReviews = await fetcher(
    `${BASE_URL}/${TEAM_ID}/products/${productId}/reviews?order=${option}`,
    {
      method: 'GET',
      next: { revalidate: 300, tags: [`${productId}/reviews`] },
    },
  );

  return productReviews.list;
};

export const postReview = async ({ productId, images, content, rating }: ReviewFormValue) => {
  const newReview = {
    productId,
    images: images ?? [],
    content,
    rating,
  };

  const res = await fetcher(`${BASE_URL}/${TEAM_ID}/reviews`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newReview),
  });

  revalidatePath(`/products/${productId}`);

  return res;
};
