// src/actions/oauthApps.ts
'use server';

const BASE = process.env.API_BASE_URL!;
const TEAM = process.env.TEST_TEAM_ID!;

type OauthAppResponse = {
  createdAt: string;
  updatedAt: string;
  appKey: string;
  provider: 'kakao';
  teamId: string;
  id: number;
};

export async function registerKakaoOauthApp() {
  const appKey = process.env.AUTH_KAKAO_ID;

  if (!appKey) {
    return {
      ok: false,
      error: 'kakao의 appKey(AUTH_KAKAO_ID)가 설정되어 있지 않습니다.',
    };
  }

  const payload = {
    appKey,
    provider: 'kakao',
  };

  const res = await fetch(`${BASE}/${TEAM}/oauthApps`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data: OauthAppResponse | null = null;
  try {
    data = text ? (JSON.parse(text) as OauthAppResponse) : null;
  } catch {
    // JSON 파싱 실패 시 무시
  }

  if (!res.ok || !data) {
    return {
      ok: false,
      status: res.status,
      error: text || '등록 실패',
    };
  }

  return {
    ok: true,
    data,
  };
}
