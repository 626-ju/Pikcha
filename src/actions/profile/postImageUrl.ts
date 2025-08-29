'use server';

import fetcher from '@/lib/utils/fetcher';

const accessToken = process.env.SERVER_TEMP_ACCESSTOKEN;

export const postImageUrl = async (file: File) => {
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
