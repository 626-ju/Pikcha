'use server';

export const getUserProducts = async (userid: number, option: string = 'created-product') => {
  const res = await fetch(`${process.env.SERVER_API_URL}/7777/users/${userid}/${option}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) console.log(res.status);

  const data = await res.json();

  return data;
};
