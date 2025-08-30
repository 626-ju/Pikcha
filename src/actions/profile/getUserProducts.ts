'use server';

import fetcher from '@/lib/utils/fetcher';

export const getUserProducts = async (userid: number, option: string = 'reviewed-products') =>
  await fetcher(
    `${process.env.API_BASE_URL}/${process.env.TEST_TEAM_ID}/users/${userid}/${option}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300, tags: [`${option}`] },
    },
  );
