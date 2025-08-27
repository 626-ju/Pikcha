'use server';

import fetcher from '@/lib/utils/fetcher';

export const getUserProducts = async (userid: number, option: string = 'created-product') =>
  await fetcher(`${process.env.SERVER_API_URL}/7777/users/${userid}/${option}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300, tags: [`${option}`] },
  });
