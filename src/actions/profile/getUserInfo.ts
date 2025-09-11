'use server';

import { auth } from '@/auth';
import { MY_INFO } from '@/constants/cacheTags';
import fetcher from '@/lib/utils/fetcher';

export const getMyInfo = async () => {
  const session = await auth();
  const accessToken = session?.accessToken;

  return await fetcher(`${process.env.API_BASE_URL}/${process.env.TEST_TEAM_ID}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300, tags: [MY_INFO] },
  });
};

export const getUserInfo = async (userid: number) => {
  const session = await auth();
  const accessToken = session?.accessToken;

  return await fetcher(`${process.env.API_BASE_URL}/${process.env.TEST_TEAM_ID}/users/${userid}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
};
