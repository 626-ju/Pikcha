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

const config: NextAuthConfig = {
  providers: [
    CustomKakaoProvider({}),
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

        if (credentials.password === 'kakao-oauth') {
          console.log('🟢 [authorize] kakao-oauth temp login');
          return {
            id: String(credentials.email),
            email: String(credentials.email),
            nickname: '',
            accessToken: undefined,
          } as User;
        }

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
    async jwt({ token, trigger, session }) {
      // 온보딩 완료 시 update()로 들어오는 값들을 JWT에 반영
      if (trigger === 'update' && session) {
        const s = session as Session & {
          accessToken?: string;
          needsOnboarding?: boolean;
          providerToken?: string;
          user?: {
            id?: string;
            email?: string;
            nickname?: string | null;
            image?: string | null;
            description?: string | null;
          };
        };

        // 토큰/플래그 반영
        if (s.accessToken) token.accessToken = s.accessToken;
        if (typeof s.needsOnboarding === 'boolean') token.needsOnboarding = s.needsOnboarding;
        if (s.providerToken) token.providerAccessToken = s.providerToken;

        // 👇 이 부분이 핵심: user 필드를 token으로 올려서 session 콜백에서 내려보냄
        if (s.user) {
          if (s.user.id) token.id = s.user.id;
          if (s.user.email) token.email = s.user.email;
          if (typeof s.user.nickname !== 'undefined') token.nickname = s.user.nickname ?? null;
          if (typeof s.user.image !== 'undefined') token.image = s.user.image ?? null;
          if (typeof s.user.description !== 'undefined')
            token.description = s.user.description ?? null;
        }
        return token;
      }

      // (나머지 최초 로그인/기타 로직이 있었다면 그대로 유지)
      return token;
    },

    async session({ session, token }) {
      // accessToken 존재 여부로 온보딩 완료 판단
      session.needsOnboarding = !token.accessToken;

      // 온보딩/로그인 이후 사용할 값들 내려주기
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
