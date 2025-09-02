import NextAuth, { type NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import CustomKakaoProvider from './auth/CustomKakaoProvider';

import type { Session, User } from 'next-auth';

// --- 환경 변수/상수 ---
const BASE = process.env.API_BASE_URL!;
const TEAM = process.env.TEST_TEAM_ID!;

const mask = (v?: string) => (v ? `${v.slice(0, 2)}***${v.slice(-4)}` : v);

console.log('[ENV] AUTH_KAKAO_ID:', mask(process.env.AUTH_KAKAO_ID));
console.log('[ENV] AUTH_KAKAO_SECRET set?:', !!process.env.AUTH_KAKAO_SECRET);
console.log('[ENV] AUTH_KAKAO_REDIRECT_URI:', process.env.AUTH_KAKAO_REDIRECT_URI);
console.log('[ENV] NEXTAUTH_URL:', process.env.NEXTAUTH_URL);

// --- 응답 타입 ---
interface BackendUser {
  id: number;
  email: string;
  description: string | null;
  image: string | null;
  nickname: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
}
interface CredentialsLoginResponse {
  user: BackendUser;
  accessToken?: string;
  token?: string;
  jwt?: string;
  message?: string;
}

// --- NextAuth 설정 ---
const config: NextAuthConfig = {
  providers: [
    // Kakao OAuth Provider
    CustomKakaoProvider({}),
    // Credentials Provider
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('🟢 [authorize] input:', credentials);

        if (!credentials?.email || !credentials?.password) {
          console.warn('⚠️ [authorize] missing email/password');
          return null;
        }

        // 카카오 회원가입 직후 임시 로그인
        if (credentials.password === 'kakao-oauth') {
          console.log('🟢 [authorize] kakao-oauth temp login');
          return {
            id: String(credentials.email),
            email: String(credentials.email),
            nickname: '',
            accessToken: undefined,
          } as User;
        }

        // 일반 로그인
        const res = await fetch(`${BASE}/${TEAM}/auth/signIn`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const raw = await res.text();
        console.log('🟢 [authorize] raw response:', raw);

        let data: CredentialsLoginResponse | null = null;
        try {
          data = raw ? (JSON.parse(raw) as CredentialsLoginResponse) : null;
        } catch {
          console.error('❌ [authorize] invalid JSON:', raw);
          throw new Error('서버 응답이 올바른 JSON이 아닙니다.');
        }

        if (!res.ok || !data?.user) {
          console.error('❌ [authorize] login failed:', data);
          throw new Error(data?.message ?? '유저 정보를 찾을 수 없습니다.');
        }

        const accessToken = data.accessToken ?? data.token ?? data.jwt ?? undefined;
        console.log(
          '🟢 [authorize] success, user id:',
          data.user.id,
          'accessToken:',
          !!accessToken,
        );

        return {
          id: String(data.user.id),
          email: data.user.email,
          description: data.user.description ?? undefined,
          image: data.user.image ?? undefined,
          nickname: data.user.nickname ?? undefined,
          updatedAt: data.user.updatedAt,
          createdAt: data.user.createdAt,
          accessToken,
        } as User;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // 세션 수동 업데이트 반영 (온보딩 완료 시)
      if (trigger === 'update' && session) {
        const s = session as Session & {
          accessToken?: string;
          needsOnboarding?: boolean;
          providerToken?: string;
        };
        if (s.accessToken) token.accessToken = s.accessToken;
        // 온보딩 완료 후 false로 덮어쓰기
        if (typeof s.needsOnboarding === 'boolean') token.needsOnboarding = s.needsOnboarding;
        if (s.providerToken) token.providerAccessToken = s.providerToken;
        return token;
      }

      // 최초 로그인 시 User → JWT 반영 (기존 코드 유지)
      if (user) {
        token.id = 'id' in user ? String(user.id) : token.id;
        token.email = 'email' in user ? (user.email as string) : token.email;
        token.image = 'image' in user ? (user.image as string) : token.image;
        token.nickname = 'nickname' in user ? user.nickname : token.nickname;
        token.description = 'description' in user ? user.description : token.description;
        if (user.accessToken) token.accessToken = user.accessToken;
      }

      // ✅ 카카오 OAuth 로그인 진입 시
      if (account?.provider === 'kakao') {
        token.provider = 'kakao';

        // 카카오 access_token 보관 (백엔드로 넘길 값)
        const kakaoAccessToken = account.access_token as string | undefined;
        if (kakaoAccessToken) token.providerAccessToken = kakaoAccessToken;

        // ✅ 백엔드 토큰이 아직 없으면 온보딩 필요로 간주
        if (!token.accessToken) {
          token.needsOnboarding = true;
        }
      }

      return token;
    },

    async session({ session, token }) {
      // 백엔드 토큰 보유 여부로 온보딩 필요 판정(안정적)
      session.needsOnboarding = token.provider === 'kakao' && !token.accessToken;

      // 온보딩에 쓸 카카오 access_token 내려주기
      session.providerToken =
        typeof token.providerAccessToken === 'string' ? token.providerAccessToken : undefined;

      session.accessToken = typeof token.accessToken === 'string' ? token.accessToken : undefined;

      session.provider = token.provider === 'kakao' ? 'kakao' : undefined;

      session.user = {
        ...session.user,
        id: typeof token.id === 'string' ? token.id : '',
        email: typeof token.email === 'string' ? token.email : '',
        image: typeof token.image === 'string' ? token.image : null,
        nickname: typeof token.nickname === 'string' ? token.nickname : null,
        description: typeof token.description === 'string' ? token.description : null,
      };

      return session;
    },
  },

  session: { strategy: 'jwt' },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
