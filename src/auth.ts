import NextAuth, { Session, type NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import CustomKakaoProvider from './auth/CustomKakaoProvider';

// 백엔드 API 기본 경로/팀 식별자
const BASE = process.env.API_BASE_URL!;
const TEAM = process.env.TEST_TEAM_ID!;

// 이메일로 사용자 존재 여부/닉네임 조회
async function fetchUserByEmail(email: string) {
  if (!email) return null;
  try {
    const res = await fetch(`${BASE}/${TEAM}/auth/user?email=${encodeURIComponent(email)}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

const config: NextAuthConfig = {
  providers: [
    // 카카오 커스텀 프로바이더 등록
    CustomKakaoProvider({}),
    // 이메일/비밀번호 자격 증명 로그인
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // 필수 입력값 검증
        if (!credentials?.email || !credentials?.password) return null;

        // 백엔드에 로그인 요청
        const res = await fetch(`${BASE}/${TEAM}/auth/signIn`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        // 응답 파싱(문자열 대비)
        const raw = await res.text();
        const data = raw ? JSON.parse(raw) : null;

        // 실패 시 에러 메시지 전달
        if (!res.ok || !data?.user) {
          throw new Error(data?.message ?? '로그인 실패');
        }

        // 세션 수화를 위한 최소 사용자/토큰 정보 반환
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
    // JWT 콜백: 로그인/세션 업데이트 시 토큰 값을 최신 상태로 반영
    async jwt({ token, user, account, trigger, session }) {
      // 세션 업데이트 트리거 시(온보딩 완료 등) 전달된 값으로 토큰 동기화
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

      // 자격 증명 로그인 시: 반환된 사용자/토큰 정보를 토큰에 반영
      if (user && !account) {
        token.id = user.id ?? token.id;
        token.email = user.email ?? token.email;
        token.nickname = user.nickname ?? token.nickname;
        token.image = user.image ?? token.image;
        token.description = user.description ?? token.description;
        token.accessToken = user.accessToken ?? token.accessToken;
      }

      // 카카오 OAuth 로그인 시: 이메일로 기존 가입자 확인 후 온보딩 여부 결정
      if (account?.provider === 'kakao') {
        token.provider = 'kakao';

        const email = user?.email ?? (token.email as string) ?? token?.email ?? '';

        if (email) {
          const existing = await fetchUserByEmail(email);

          // 임시 디버그 로그(필요 시에만 사용)
          // console.log('[JWT][kakao] email:', email, 'existing:', existing);

          if (existing?.nickname) {
            // 기존 가입자 → 온보딩 스킵 및 사용자 정보 보강
            token.needsOnboarding = false;
            token.nickname = existing.nickname;
            token.id = String(existing.id ?? token.id);
            token.email = existing.email ?? email;
            // 필요 시 여기서 백엔드 액세스 토큰 발급 API를 호출해 token.accessToken 설정
          } else {
            // 신규 사용자 → 온보딩 필요
            token.needsOnboarding = true;
          }
        } else {
          // 이메일 부재 → 온보딩 필요
          token.needsOnboarding = true;
        }
      }

      return token;
    },

    // Session 콜백: 클라이언트로 내려갈 세션 객체 생성/매핑
    async session({ session, token }) {
      // 온보딩 필요 여부(카카오 로그인 + 닉네임 없음 기준)
      session.needsOnboarding = token.provider === 'kakao' && !token.nickname;

      // 액세스 토큰/프로바이더 정보 세션에 포함
      session.accessToken = typeof token.accessToken === 'string' ? token.accessToken : undefined;
      session.provider = token.provider === 'kakao' ? 'kakao' : undefined;

      // 사용자 프로필 정보 세션에 포함
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

  // JWT 기반 세션 전략 사용
  session: { strategy: 'jwt' },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
