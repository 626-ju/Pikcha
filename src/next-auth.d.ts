// next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as NextAuthJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      nickname?: string | null;
      teamId?: string | null;
      description?: string | null;
    } & DefaultSession['user'];
    accessToken?: string;
    code?: string;
    providerToken?: string;

    needsOnboarding?: boolean;
    provider?: 'kakao';
    code?: string;
  }

  interface User extends DefaultUser {
    id: string;
    nickname?: string | null;
    teamId?: string | null;
    description?: string | null;
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends NextAuthJWT {
    id: string;
    nickname?: string | null;
    teamId?: string | null;
    accessToken?: string;

    needsOnboarding?: boolean;
    provider?: 'kakao';
    oauthProviderToken?: string;
  }
}
