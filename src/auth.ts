import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

// 백엔드 API에서 반환되는 유저 객체 타입 정의
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

// NextAuth에서 사용할 커스텀 유저 타입
interface CustomUser {
  id: string;
  email?: string | null;
  description?: string | null;
  nickname?: string | null;
  image?: string | null;
  updatedAt: string;
  createdAt: string;
  accessToken?: string;
}

// NextAuth 객체 생성
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    // 구글 OAuth 로그인 설정 : 가능 할진...모르겠 카카오만 가능하다는 걸 어디서 읽은거같은데
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    // 카카오 OAuth 로그인 설정
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_ID!,
      clientSecret: process.env.AUTH_KAKAO_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    // 이메일/비밀번호 로그인 설정
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      // 실제 로그인 처리 함수
      async authorize(credentials) {
        if (!credentials) return null;

        // 백엔드 API에 로그인 요청
        const res = await fetch(`${process.env.API_BASE_URL}/${process.env.TEAM_ID}/auth/signIn`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        // 1️⃣ 응답 텍스트 확인
        const text = await res.text();
        console.log('서버 응답 텍스트:', text);

        // 2️⃣ JSON 파싱 (빈 문자열이면 여기서 에러 가능)
        let data;
        try {
          data = text ? JSON.parse(text) : null;
        } catch (err) {
          console.error('JSON 파싱 실패:', err);
          throw new Error('서버 응답이 올바른 JSON이 아닙니다.');
        }

        // 3️⃣ user 객체 확인
        if (!data?.user) {
          throw new Error(data?.message || '유저 정보를 찾을 수 없습니다.');
        }

        const user = data.user as BackendUser;

        return {
          id: user.id.toString(),
          email: user.email,
          description: user.description,
          image: user.image,
          nickname: user.nickname,
          updatedAt: user.updatedAt,
          createdAt: user.createdAt,
        } as CustomUser;
      },
    }),
  ],

  // 콜백 설정
  callbacks: {
    async redirect({ baseUrl }) {
      // 로그인 성공 후 무조건 랜딩페이지로 이동
      return `${baseUrl}`;
    },

    // JWT 생성/갱신 시 호출
    async jwt({ token, user, account }) {
      if (user && account) {
        // 로그인 시 토큰에 유저 정보 + accessToken 저장
        token.id = user.id;
        token.email = user.email;
        token.description = user.description;
        token.nickname = user.nickname;
        token.image = user.image;

        // OAuth 로그인 시 access_token 포함
        if (account.access_token) {
          token.accessToken = account.access_token;
        }

        // Credentials 로그인이라면 authorize() 응답에서 직접 받은 accessToken 넣기
        if (user.accessToken) {
          token.accessToken = user.accessToken;
        }
      }
      return token;
    },

    // 세션 생성 시 호출
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email as string;
        session.user.description = token.description as string;
        session.user.image = token.image as string;
        session.user.nickname = token.nickname;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },

  // 세션 전략 설정 : JWT 기반 세션 사용
  session: { strategy: 'jwt' },
});
