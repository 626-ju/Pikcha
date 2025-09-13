import fetcher from '@/lib/utils/fetcher';

const getFollowInfo = async (type: 'followers' | 'followees', cursor: number = 0, userid: number) =>
  await fetcher(
    `${process.env.API_BASE_URL}/${process.env.TEST_TEAM_ID}/users/${userid}/${type}?cursor=${cursor}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300, tags: [`followInfo-${type}`] },
    },
  );

export default getFollowInfo;
