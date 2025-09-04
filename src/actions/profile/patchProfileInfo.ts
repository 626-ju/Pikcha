'use server';

import { revalidateTag } from 'next/cache';

import { auth } from '@/auth';
import { MY_INFO } from '@/constants/cacheTags';
import fetcher from '@/lib/utils/fetcher';
import { ProfileFormValues } from '@/types/profile/profileUpdateSchema';

export const patchProfileInfo = async ({ nickname, description, image }: ProfileFormValues) => {
  const session = await auth();
  const accessToken = session?.accessToken;

  const payload = {
    nickname,
    description,
    image:
      image?.[0] ?? 'https://chipper-hummingbird-0e6d64.netlify.app/images/default-profile.png',
  };

  const res = await fetcher(`${process.env.API_BASE_URL}/${process.env.TEST_TEAM_ID}/users/me`, {
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
