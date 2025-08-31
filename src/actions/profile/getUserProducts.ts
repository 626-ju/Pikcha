'use server';

import fetcher from '@/lib/utils/fetcher';

export const getUserProducts = async (
  userid: number,
  option: string = 'reviewed-products',
  cursor: number = 0,
) =>
  await fetcher(
    `${process.env.API_BASE_URL}/${process.env.TEST_TEAM_ID}/users/${userid}/${option}?cursor=${cursor}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );
