import type { Session } from 'next-auth';

/** 닉네임 존재 여부 */
export const hasNickname = (session?: Session | null) => Boolean(session?.user?.nickname);

/** 온보딩 스킵 조건 */
export const shouldSkipOnboarding = (session?: Session | null) =>
  session?.needsOnboarding === false || Boolean(session?.accessToken);

/** 카카오 프로바이더 여부 */
export const isKakaoProvider = (session?: Session | null) => session?.provider === 'kakao';
