'use server';
import 'server-only';

import fetcher from '@/lib/utils/fetcher';
import { UserRanking } from '@/types/user/userRanking';

const API_BASE_URL = process.env.API_BASE_URL ?? '';
const TEAM_ID = process.env.TEAM_ID ?? '';

export const getReviewerRanking = async (): Promise<UserRanking[]> => {
  const data = await fetcher(`${API_BASE_URL}/${TEAM_ID}/users/ranking`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 300, tags: ['reviewer-ranking'] },
  });
  return data.slice(0, 5);
};
