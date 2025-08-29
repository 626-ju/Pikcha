'use server';

import { MY_INFO } from '@/constants/cacheTags';
import fetcher from '@/lib/utils/fetcher';

const accessToken = process.env.SERVER_TEMP_ACCESSTOKEN;

export const getMyInfo = async () =>
  await fetcher(`${process.env.API_BASE_URL}/${process.env.TEST_TEAM_ID}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300, tags: [MY_INFO] },
  });

export const getUserInfo = async (userid: number) =>
  await fetcher(`${process.env.API_BASE_URL}//users/${userid}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
