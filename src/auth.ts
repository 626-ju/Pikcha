import NextAuth, { Session, type NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import CustomKakaoProvider from './auth/CustomKakaoProvider';

const BASE = process.env.API_BASE_URL!;
const TEAM = process.env.TEST_TEAM_ID!;

// 이메일로 유저 존재/닉네임 조회 (엔드포인트는 실제 것에 맞춰 수정)
async function fetchUserByEmail(email: string) {
  if (!email) return null;
  try {
    // 예시 1) GET /{TEAM}/users/by-email?email=...
    // const res = await fetch(`${BASE}/${TEAM}/users/by-email?email=${encodeURIComponent(email)}`, { cache: "no-store" });

    // 예시 2) GET /{TEAM}/auth/user?email=...
    const res = await fetch(`${BASE}/${TEAM}/auth/user?email=${encodeURIComponent(email)}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;
    const data = await res.json();
    // data: { id, email, nickname, image, description, ... } 형태라고 가정
    return data;
  } catch {
    return null;
  }
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

        return {
          id: String(data.user.id),
          email: data.user.email,
          nickname: data.user.nickname ?? undefined,
          image: data.user.image ?? undefined,
          description: data.user.description ?? undefined,
          accessToken: data.accessToken ?? data.token ?? data.jwt ?? undefined,
        };
      },
    }),
  ],

  callbacks: {
    // ⚠️ 핵심: 새 OAuth 로그인 시 이메일로 백엔드 조회해서 needsOnboarding/닉네임 재하이드레이션
    async jwt({ token, user, account, trigger, session }) {
      // 세션 업데이트(온보딩 완료 시) 그대로 유지
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
        if (s.accessToken) token.accessToken = s.accessToken;
        if (typeof s.needsOnboarding === 'boolean') token.needsOnboarding = s.needsOnboarding;
        if (s.user?.id) token.id = s.user.id;
        if (s.user?.email) token.email = s.user.email;
        if (typeof s.user?.nickname !== 'undefined') token.nickname = s.user.nickname ?? null;
        if (typeof s.user?.image !== 'undefined') token.image = s.user.image ?? null;
        if (typeof s.user?.description !== 'undefined')
          token.description = s.user.description ?? null;
        return token;
      }

      // Credentials 로그인 시 유저 필드 반영
      if (user && !account) {
        token.id = user.id ?? token.id;
        token.email = user.email ?? token.email;
        token.nickname = user.nickname ?? token.nickname;
        token.image = user.image ?? token.image;
        token.description = user.description ?? token.description;
        token.accessToken = user.accessToken ?? token.accessToken;
      }

      // ✅ 새로 카카오로 로그인했을 때: 백엔드에 같은 이메일 유저가 있으면 온보딩 스킵
      if (account?.provider === 'kakao') {
        token.provider = 'kakao';

        const email = user?.email ?? (token.email as string) ?? token?.email ?? '';

        if (email) {
          const existing = await fetchUserByEmail(email);

          // 🔍 임시 디버그
          console.log('[JWT][kakao] email:', email, 'existing:', existing);

          if (existing?.nickname) {
            // 이미 가입된 사용자 → 온보딩 불필요
            token.needsOnboarding = false;
            token.nickname = existing.nickname;
            token.id = String(existing.id ?? token.id);
            token.email = existing.email ?? email;
            // (백엔드 accessToken을 발급해주는 로그인 API가 따로 있다면 여기서 호출해 token.accessToken도 세팅)
          } else {
            // 가입 이력 없음 → 온보딩 필요
            token.needsOnboarding = true;
          }
        } else {
          token.needsOnboarding = true;
        }
      }

      return token;
    },

    async session({ session, token }) {
      // 온보딩 필요 판정: "카카오 로그인이고 닉네임이 없다" 기준으로 단순화
      session.needsOnboarding = token.provider === 'kakao' && !token.nickname;

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
