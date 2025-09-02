import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';

const KAKAO_REDIRECT_URI =
  process.env.AUTH_KAKAO_REDIRECT_URI ?? 'http://localhost:3000/api/auth/callback/kakao';

interface KakaoProfile {
  id: number;
  kakao_account?: {
    email?: string;
    profile?: {
      nickname?: string;
      profile_image_url?: string;
    };
  };
}

export default function CustomKakaoProvider<P extends KakaoProfile>(
  _options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: 'kakao',
    name: 'Kakao',
    type: 'oauth',

    // 환경변수 그대로 사용
    clientId: process.env.AUTH_KAKAO_ID!,
    clientSecret: process.env.AUTH_KAKAO_SECRET ?? '',

    // ★ 핵심 한 줄: 카카오는 POST 방식만 인정
    client: { token_endpoint_auth_method: 'client_secret_post' },

    authorization: {
      url: 'https://kauth.kakao.com/oauth/authorize',
      params: {
        response_type: 'code',
        redirect_uri: KAKAO_REDIRECT_URI,
        scope: 'account_email profile_nickname',
      },
    },

    // 기본 토큰 엔드포인트만 지정(오버라이드 하지 않음)
    token: { url: 'https://kauth.kakao.com/oauth/token' },

    userinfo: { url: 'https://kapi.kakao.com/v2/user/me' },

    profile(profile: P) {
      const acc = profile.kakao_account;
      const p = acc?.profile;
      return {
        id: String(profile.id),
        email: acc?.email ?? null,
        name: p?.nickname ?? null,
        image: p?.profile_image_url ?? null,
      };
    },
  };
}
