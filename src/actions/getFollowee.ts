'use server';

const getFollowee = async (cursor: number = 0) => {
  const accessToken = process.env.NEXT_PUBLIC_TEMP_ACCESSTOKEN;
  const res = await fetch(
    // 리밋을 서버 쪽에서 12개로 강제 했나봐요
    `${process.env.NEXT_PUBLIC_API_URL}/7777/users/835/followees?cursor=${cursor}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
    },
  );

  if (!res.ok) console.log(res.status);

  const data = await res.json();

  return data;
};

export default getFollowee;
