'use server';
const accessToken = process.env.NEXT_PUBLIC_TEMP_ACCESSTOKEN;

export const getMyInfo = async () => {
  const res = await fetch(`${process.env.NEXT_SERVER_API_URL}/7777/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  });

  if (!res.ok) console.log(res.status);

  const data = await res.json();

  return data;
};

export const getUserInfo = async (userid: number) => {
  const res = await fetch(`${process.env.NEXT_SERVER_API_URL}/7777/users/${userid}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  });

  if (!res.ok) console.log(res.status);

  const data = await res.json();

  return data;
};
