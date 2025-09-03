import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';

// NextAuth 카카오 콜백 URI
const KAKAO_REDIRECT_URI =
  process.env.AUTH_KAKAO_REDIRECT_URI ?? 'http://localhost:3000/api/auth/callback/kakao';

// 카카오 프로필 응답에서 사용하는 최소 필드
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

    // 카카오 앱 키/시크릿(환경변수)
    clientId: process.env.AUTH_KAKAO_ID!,
    clientSecret: process.env.AUTH_KAKAO_SECRET ?? '',

    // 카카오는 토큰 인증 방식으로 client_secret_post 사용
    client: { token_endpoint_auth_method: 'client_secret_post' },

    // 인가 요청 설정
    authorization: {
      url: 'https://kauth.kakao.com/oauth/authorize',
      params: {
        response_type: 'code',
        redirect_uri: KAKAO_REDIRECT_URI,
        scope: 'account_email profile_nickname',
      },
    },

    // 토큰/유저 정보 엔드포인트
    token: { url: 'https://kauth.kakao.com/oauth/token' },
    userinfo: { url: 'https://kapi.kakao.com/v2/user/me' },

    // 카카오 프로필을 NextAuth 표준 사용자로 매핑
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
