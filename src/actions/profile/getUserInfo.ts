'use server';

import { MY_INFO } from '@/constants/cacheKeys';

const accessToken = process.env.SERVER_TEMP_ACCESSTOKEN;

export const getMyInfo = async () => {
  const res = await fetch(`${process.env.SERVER_API_URL}/7777/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300, tags: [MY_INFO] },
  });

  if (!res.ok) console.log(res.status);

  const data = await res.json();

  return data;
};

export const getUserInfo = async (userid: number) => {
  const res = await fetch(`${process.env.SERVER_API_URL}/7777/users/${userid}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) console.log(res.status);

  const data = await res.json();

  return data;
};
