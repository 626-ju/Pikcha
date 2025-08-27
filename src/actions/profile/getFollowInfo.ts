'use server';

import fetcher from '@/lib/utils/fetcher';

const getFollowInfo = async (type: 'followers' | 'followees', cursor: number = 0) =>
  await fetcher(`${process.env.SERVER_API_URL}/7777/users/835/${type}?cursor=${cursor}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300, tags: [`followInfo-${type}`] },
  });

export default getFollowInfo;
