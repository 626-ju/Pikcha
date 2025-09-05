'use server';

import { auth } from '@/auth';
import fetcher from '@/lib/utils/fetcher';

export const postImageUrl = async (file: File) => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const formData = new FormData();
  formData.append('image', file);

  const res = await fetcher(
    `${process.env.API_BASE_URL}/${process.env.TEST_TEAM_ID}/images/upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    },
  );

  return res;
};
