'use server';

import { revalidateTag } from 'next/cache';

import { MY_INFO } from '@/constants/cacheTags';
import fetcher from '@/lib/utils/fetcher';
import { ProfileFormValues } from '@/types/profile/profileUpdateSchema';

const accessToken = process.env.SERVER_TEMP_ACCESSTOKEN;

export const patchProfileInfo = async ({ nickname, description, image }: ProfileFormValues) => {
  const payload = {
    nickname,
    description,
    image: image?.[0] ?? '',
  };

  const res = await fetcher(`${process.env.SERVER_API_URL}/7777/users/me`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  revalidateTag(MY_INFO);

  return res;
};
