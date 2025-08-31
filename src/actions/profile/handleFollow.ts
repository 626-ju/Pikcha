'use server';

import fetcher from '@/lib/utils/fetcher';

export const postFollow = async (userId: number) => {
  const res = await fetcher(`${process.env.API_BASE_URL}/${process.env.TEST_TEAM_ID}/follow`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SERVER_TEMP_ACCESSTOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
    cache: 'no-store',
  });

  return res;
};

export const deleteFollow = async (userId: number) => {
  const res = await fetcher(`${process.env.API_BASE_URL}/${process.env.TEST_TEAM_ID}/follow`, {
    method: 'Delete',
    headers: {
      Authorization: `Bearer ${process.env.SERVER_TEMP_ACCESSTOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
    cache: 'no-store',
  });
  return res;
};
