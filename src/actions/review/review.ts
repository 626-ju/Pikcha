'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

import { auth } from '@/auth';
import fetcher from '@/lib/utils/fetcher';
import { ReviewDetail, ReviewFormValue, ReviewPatchFormValue } from '@/types/review/review';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.TEST_TEAM_ID;

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const NEXT_PUBLIC_TEAM_ID = process.env.NEXT_PUBLIC_TEST_TEAM_ID;

export const getProductReviews = async (
  productId: number,
  option: string = 'recent',
): Promise<ReviewDetail[]> => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const productReviews = await fetcher(
    `${BASE_URL}/${TEAM_ID}/products/${productId}/reviews?order=${option}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300, tags: [`reviews`] },
      cache: 'force-cache',
    },
  );

  return productReviews.list;
};

export const postReview = async ({
  data,
  productId,
}: {
  data: ReviewFormValue;
  productId: number;
}) => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const newReview = {
    productId,
    images: data.images ?? [],
    content: data.content,
    rating: data.rating,
  };

  const res = await fetcher(`${BASE_URL}/${TEAM_ID}/reviews`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newReview),
    cache: 'no-store',
  });

  revalidatePath(`/products/${productId}`);

  return res;
};

export const patchReview = async ({ rating, content, images, reviewId }: ReviewPatchFormValue) => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const newReview = {
    images,
    content,
    rating,
  };

  const res = await fetcher(`${BASE_URL}/${TEAM_ID}/reviews/${reviewId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newReview),
    cache: 'no-store',
  });

  revalidateTag('reviews');

  return res;
};

export const deleteReview = async (reviewId: number) => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const res = await fetcher(`${BASE_URL}/${TEAM_ID}/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      cache: 'no-store',
    },
  });

  revalidateTag('reviews');

  return res;
};

export const toggleReviewLike = async (reviewId: number, isCurrentlyLike: boolean) => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const method = isCurrentlyLike ? 'DELETE' : 'POST';
  console.log('method:', method);
  const res = await fetcher(
    `${NEXT_PUBLIC_BASE_URL}/${NEXT_PUBLIC_TEAM_ID}/reviews/${reviewId}/like`,
    {
      method: method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300, tags: [`reviews`] },
    },
  );

  revalidateTag('reviews');
  //여기도...고민 좀 해보자

  return res;
};
