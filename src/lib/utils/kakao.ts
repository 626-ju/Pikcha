// 클라이언트에서만 사용하는 헬퍼이므로 window 접근은 함수 내부에서만 처리
const KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';

/** 백엔드에서 기대하는 카카오 redirectUri 계산 */
export const getBackendKakaoRedirectUri = () => {
  const envUri = process.env.NEXT_PUBLIC_BACKEND_KAKAO_REDIRECT_URI;
  if (envUri) return envUri;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return `${origin}/oauth/kakao`;
};

/** 카카오 인가 URL 생성 */
export const buildKakaoAuthorizeUrl = () => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  if (!clientId) {
    throw new Error('NEXT_PUBLIC_KAKAO_CLIENT_ID 환경변수가 설정되지 않았습니다.');
  }

  const redirectUri = getBackendKakaoRedirectUri();
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'account_email profile_nickname',
  });
  return `${KAKAO_AUTHORIZE_URL}?${params.toString()}`;
};

/** 카카오 인가로 이동 */
export const beginKakaoAuthorize = () => {
  if (typeof window === 'undefined') return;
  window.location.href = buildKakaoAuthorizeUrl();
};

/** 카카오 code 파라미터 제거(루프 방지) */
export const clearKakaoAuthCode = () => {
  if (typeof window === 'undefined') return;
  window.history.replaceState(null, '', '/oauth/kakao');
};
