import NextAuth, { Session, type NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import CustomKakaoProvider from './auth/CustomKakaoProvider';

const BASE = process.env.API_BASE_URL!;
const TEAM = process.env.TEST_TEAM_ID!;

/** 문자열 세이프 접근 헬퍼 */
function pickString(obj: unknown, key: string): string | undefined {
  if (typeof obj !== 'object' || obj === null) return undefined;
  const v = (obj as Record<string, unknown>)[key];
  return typeof v === 'string' ? v : undefined;
}
function setTokenString(token: object, key: string, value?: string | null) {
  if (typeof value === 'string' || value === null) {
    (token as Record<string, unknown>)[key] = value;
  }
}
function setTokenBool(token: object, key: string, value?: boolean) {
  if (typeof value === 'boolean') {
    (token as Record<string, unknown>)[key] = value;
  }
}
function getTokenString(token: object, key: string): string | undefined {
  const v = (token as Record<string, unknown>)[key];
  return typeof v === 'string' ? v : undefined;
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
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(`${BASE}/${TEAM}/auth/signIn`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const raw = await res.text();
        const data = raw ? JSON.parse(raw) : null;
        if (!res.ok || !data?.user) {
          throw new Error(data?.message ?? '로그인 실패');
        }

        const nickname =
          typeof data?.user?.nickname === 'string' && data.user.nickname.trim() !== ''
            ? data.user.nickname.trim()
            : undefined;

        return {
          id: String(data.user.id),
          email: data.user.email,
          name: nickname ?? data.user.email,
          nickname,
          image: data.user.image ?? undefined,
          description: data.user.description ?? undefined,
          accessToken: data.accessToken ?? data.token ?? data.jwt ?? undefined,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // 세션 update로 들어온 값 반영
      if (trigger === 'update' && session) {
        const s = session as Session & {
          accessToken?: string;
          needsOnboarding?: boolean;
          user?: {
            id?: string;
            email?: string;
            nickname?: string | null;
            image?: string | null;
            description?: string | null;
          };
        };
        if (s.accessToken) setTokenString(token, 'accessToken', s.accessToken);
        if (typeof s.needsOnboarding === 'boolean')
          setTokenBool(token, 'needsOnboarding', s.needsOnboarding);
        if (s.user?.id) setTokenString(token, 'id', s.user.id);
        if (s.user?.email) setTokenString(token, 'email', s.user.email);
        if (typeof s.user?.nickname !== 'undefined')
          setTokenString(token, 'nickname', s.user.nickname);
        if (typeof s.user?.image !== 'undefined') setTokenString(token, 'image', s.user.image);
        if (typeof s.user?.description !== 'undefined')
          setTokenString(token, 'description', s.user.description);
        return token;
      }

      // 자격증명 로그인 → 토큰 수화
      const isCredentials =
        !account ||
        account.provider === 'credentials' ||
        (account as { type?: string }).type === 'credentials';

      if (user && isCredentials) {
        const nick =
          pickString(user, 'nickname') ??
          pickString(user, 'name') ??
          getTokenString(token, 'nickname');
        if (nick) setTokenString(token, 'nickname', nick);

        const id = pickString(user, 'id');
        if (id) setTokenString(token, 'id', id);
        const email = pickString(user, 'email');
        if (email) setTokenString(token, 'email', email);
        const image = pickString(user, 'image');
        if (image) setTokenString(token, 'image', image);
        const desc = pickString(user, 'description');
        if (desc) setTokenString(token, 'description', desc);

        const access = pickString(user, 'accessToken');
        if (access) setTokenString(token, 'accessToken', access);
      }

      // 카카오 OAuth: 여기서는 "표식"만 남겨두고, 실제 기존/신규 판정은 온보딩 훅이 수행
      if (account?.provider === 'kakao') {
        setTokenString(token, 'provider', 'kakao');
        // 초기 진입 상태에선 accessToken이 없으므로 일단 온보딩 필요로 표시해둠
        setTokenBool(token, 'needsOnboarding', true);
        // ⬇ 추가: 카카오 프로필에서 넘어온 user 에서 기본 식별값 하이드레이션
        if (user) {
          const email = pickString(user, 'email');
          if (email) setTokenString(token, 'email', email);

          const id = pickString(user, 'id');
          if (id) setTokenString(token, 'id', id);

          const image = pickString(user, 'image');
          if (image) setTokenString(token, 'image', image);
        }
      }

      return token;
    },

    async session({ session, token }) {
      const provider = getTokenString(token, 'provider');
      const accessToken = getTokenString(token, 'accessToken');

      // 온보딩 필요 여부: "카카오 + 백엔드 accessToken 아직 없음"
      session['needsOnboarding'] = provider === 'kakao' && !accessToken;

      session['accessToken'] = accessToken;
      session['provider'] = provider === 'kakao' ? 'kakao' : undefined;

      session.user = {
        ...session.user,
        id: getTokenString(token, 'id') ?? '',
        email: getTokenString(token, 'email') ?? '',
        image: getTokenString(token, 'image') ?? null,
        nickname: getTokenString(token, 'nickname') ?? null,
        description: getTokenString(token, 'description') ?? null,
      };

      return session;
    },
  },

  session: { strategy: 'jwt' },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
