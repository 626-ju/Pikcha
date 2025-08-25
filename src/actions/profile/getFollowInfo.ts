'use server';

const getFollowInfo = async (type: 'followers' | 'followees', cursor: number = 0) => {
  const res = await fetch(
    // 리밋을 서버 쪽에서 12개로 강제 했나봐요
    `https://mogazoa-api.vercel.app/7777/users/835/${type}?cursor=${cursor}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 },
    },
  );

  if (!res.ok) console.log(res.status);

  const data = await res.json();

  return data;
};

export default getFollowInfo;
