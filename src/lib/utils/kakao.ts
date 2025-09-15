// 클라이언트에서만 사용하는 헬퍼이므로 window 접근은 함수 내부에서만 처리
const KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';

type OAuthFlow = 'signin' | 'signup';

/** 백엔드에서 기대하는 카카오 redirectUri 계산 */
export const getBackendKakaoRedirectUri = () => {
  const envUri = process.env.NEXT_PUBLIC_BACKEND_KAKAO_REDIRECT_URI;
  if (envUri) return envUri;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/oauth/kakao`;
};

/** state 생성/검증용 nonce 저장 */
const putNonce = (nonce: string) => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('kakao_oauth_nonce', nonce);
};
const getNonce = () => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('kakao_oauth_nonce');
};

/** 현재 URL의 state 읽기 */
export const readOAuthState = (): { flow: OAuthFlow; valid: boolean } => {
  if (typeof window === 'undefined') return { flow: 'signin', valid: false };
  const sp = new URL(window.location.href).searchParams;
  const raw = sp.get('state');
  try {
    const parsed = raw ? JSON.parse(raw) : null;
    const stored = getNonce();
    const valid = Boolean(stored && parsed?.nonce === stored);
    const flow = (parsed?.flow as OAuthFlow) || 'signin';
    return { flow, valid };
  } catch {
    return { flow: 'signin', valid: false };
  }
};

/** 카카오 인가 URL 생성 (signin / signup 목적 명시) */
export const buildKakaoAuthorizeUrl = (flow: OAuthFlow = 'signin') => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  if (!clientId) {
    throw new Error('NEXT_PUBLIC_KAKAO_CLIENT_ID 환경변수가 설정되지 않았습니다.');
  }

  const redirectUri = getBackendKakaoRedirectUri();
  const nonce = Math.random().toString(36).slice(2);
  putNonce(nonce);

  const state = JSON.stringify({ flow, nonce });

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'account_email profile_nickname',
    state, // ← 목적 + CSRF 보호
  });
  return `${KAKAO_AUTHORIZE_URL}?${params.toString()}`;
};

/** 카카오 인가로 이동 (목적 지정) */
export const beginKakaoAuthorize = (flow: OAuthFlow = 'signin') => {
  if (typeof window === 'undefined') return;
  window.location.href = buildKakaoAuthorizeUrl(flow);
};
