// src/actions/debug.ts
'use server';

import { auth } from '@/auth';

export async function assertBackendMapping(tag = 'post-onboarding') {
  const session = await auth();
  console.log(`🧪 [${tag}] session snapshot`, {
    email: session?.user?.email,
    nickname: session?.user?.nickname ?? null,
    hasAccessToken: Boolean(session?.accessToken),
  });

  if (!session?.accessToken) {
    console.log('🧪 no backend accessToken on session');
    return { ok: false, reason: 'no-access-token' };
  }

  const res = await fetch(`${process.env.API_BASE_URL}/${process.env.TEST_TEAM_ID}/users/me`, {
    headers: { Authorization: `Bearer ${session.accessToken}` },
    cache: 'no-store',
  });
  const json = await res.json().catch(() => null);

  console.log('🧪 [backend /users/me] ->', { ok: res.ok, json });

  return { ok: res.ok, json };
}
