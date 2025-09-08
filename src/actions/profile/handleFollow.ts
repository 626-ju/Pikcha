'use server';

import { revalidateTag } from 'next/cache';

import { auth } from '@/auth';
import { FOLLOWINFO_FOLLOWEES } from '@/constants/cacheTags';
import fetcher from '@/lib/utils/fetcher';

export const postFollow = async (userId: number) => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const res = await fetcher(`${process.env.API_BASE_URL}/${process.env.TEST_TEAM_ID}/follow`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
    cache: 'no-store',
  });

  revalidateTag(FOLLOWINFO_FOLLOWEES);

  return res;
};

export const deleteFollow = async (userId: number) => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const res = await fetcher(`${process.env.API_BASE_URL}/${process.env.TEST_TEAM_ID}/follow`, {
    method: 'Delete',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
    cache: 'no-store',
  });

  revalidateTag(FOLLOWINFO_FOLLOWEES);

  return res;
};
