'use server';
import 'server-only';

import fetcher from '@/lib/utils/fetcher';
import { UserRanking } from '@/types/user/userRanking';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '';

export const getReviewerRanking = async (): Promise<UserRanking[]> => {
  const data = await fetcher(`${API_BASE}/users/ranking`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  return data.slice(0, 5);
};
