import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';

const KAKAO_REDIRECT_URI =
  process.env.AUTH_KAKAO_REDIRECT_URI ?? 'http://localhost:3000/api/auth/callback/kakao';
const KAKAO_ID = process.env.AUTH_KAKAO_ID!;
const KAKAO_SECRET = process.env.AUTH_KAKAO_SECRET!;

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
    clientId: KAKAO_ID,
    clientSecret: KAKAO_SECRET,

    authorization: {
      url: 'https://kauth.kakao.com/oauth/authorize',
      params: {
        redirect_uri: KAKAO_REDIRECT_URI,
        response_type: 'code',
        scope: 'account_email profile_nickname',
      },
    },

    // token 엔드포인트는 반드시 정의 필요
    token: {
      url: 'https://kauth.kakao.com/oauth/token',
      async request(context: { params: Record<string, string | undefined> }) {
        // 여기서 실제 교환 대신 code를 세션에 저장하도록 커스터마이징
        const code = context.params?.code as string | undefined;
        return {
          tokens: {
            code, // 우리가 필요한 건 access_token이 아니라 인가코드
          },
        };
      },
    },

    userinfo: {
      url: 'https://kapi.kakao.com/v2/user/me',
    },

    profile(profile: P) {
      return {
        id: String(profile.id),
        email: profile.kakao_account?.email ?? null,
        name: profile.kakao_account?.profile?.nickname ?? null,
        image: profile.kakao_account?.profile?.profile_image_url ?? null,
      };
    },
  };
}
