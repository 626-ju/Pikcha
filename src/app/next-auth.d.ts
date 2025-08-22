// next-auth.d.ts

import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as NextAuthJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  // Session 인터페이스 확장
  interface Session {
    user: {
      id: string;
      nickname?: string | null;
      teamId?: string | null;
    } & DefaultSession['user'];
  }

  // User 인터페이스 확장
  interface User extends DefaultUser {
    id: string;
    nickname?: string | null;
    teamId?: string | null;
  }
}

declare module 'next-auth/jwt' {
  // JWT 인터페이스 확장
  interface JWT extends NextAuthJWT {
    id: string;
    nickname?: string | null;
    teamId?: string | null;
  }
}
