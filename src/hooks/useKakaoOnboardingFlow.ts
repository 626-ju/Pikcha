// useKakaoOnboardingFlow.ts
'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { beginKakaoAuthorize, getBackendKakaoRedirectUri, readOAuthState } from '@/lib/utils/kakao';
import { postJson } from '@/lib/utils/network';
import { isKakaoProvider, shouldSkipOnboarding } from '@/lib/utils/session';

type Phase = 'probing' | 'form' | 'redirecting';

type SignInResponse = {
  accessToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    image: string | null;
    description: string | null;
  };
};

type UseKakaoOnboardingFlowResult = {
  phase: Phase;
  isBusy: boolean;
  errorMessage: string | null;
  submitNickname: (values: { nickname: string }) => Promise<void>;
};

/** 현재 URL에서 code 읽기 */
const readFreshCode = (): string | null => {
  if (typeof window === 'undefined') return null;
  const code = new URL(window.location.href).searchParams.get('code');
  console.log('[AuthCode] 현재 URL에서 읽은 code:', code);
  return code;
};

export const useKakaoOnboardingFlow = (): UseKakaoOnboardingFlowResult => {
  const { data: session, update, status } = useSession();
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>('probing');
  const [isBusy, setIsBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1) 진입: state(flow) 먼저 읽고, flow 별로 동작
  useEffect(() => {
    if (status === 'loading') return;

    const code = readFreshCode();
    const { flow } = readOAuthState(); // ← 목적(signin/signup)

    if (!code) {
      // 코드 없으면 현재 목적(flow)으로 인가부터
      beginKakaoAuthorize(flow);
      return;
    }

    if (!isKakaoProvider(session) || shouldSkipOnboarding(session)) {
      router.replace('/');
      return;
    }

    // flow=signup 이면 절대 signIn 시도하지 말고, 폼만 노출
    if (flow === 'signup') {
      setPhase('form');
      return;
    }

    // flow=signin → 기존 가입자 확인 시도
    (async () => {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL!;
      const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
      const redirectUri = getBackendKakaoRedirectUri();
      const url = `${apiBase}/${teamId}/auth/signIn/kakao`;

      setPhase('probing');
      setErrorMessage(null);

      console.log('[Onboarding:signIn] 요청 전송', { url, code, redirectUri });
      const { ok, data, rawText } = await postJson<SignInResponse>(url, {
        redirectUri,
        token: code,
      });
      console.log('[Onboarding:signIn] 응답 수신', { ok, data, rawText });

      if (ok && data?.accessToken && data.user) {
        console.log('[Onboarding:signIn] ✅ 기존 사용자 확인 완료');
        await update({
          accessToken: data.accessToken,
          needsOnboarding: false,
          user: {
            id: String(data.user.id),
            email: data.user.email,
            nickname: data.user.nickname,
            image: data.user.image,
            description: data.user.description,
          },
        });
        window.location.href = '/';
        return;
      }

      // 로그인 실패(대부분 미가입) → 새 코드가 필요하므로
      // 즉시 signup 목적의 인가로 리다이렉트 → 돌아오면 flow=signup 이라 signIn은 건너뛰고 폼만 보임
      console.warn('[Onboarding:signIn] ❌ 실패 → 새 코드 발급 후 signup 플로우로');
      setPhase('redirecting');
      beginKakaoAuthorize('signup');
    })();
  }, [status, session, update, router]);

  // 2) 신규: 폼 제출 시 signUp 호출. flow=signup 으로 받은 code만 사용
  const submitNickname = async (values: { nickname: string }) => {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
    const redirectUri = getBackendKakaoRedirectUri();
    const url = `${apiBase}/${teamId}/auth/signUp/kakao`;

    console.log('[Onboarding:signUp] 제출 시도', { values, isBusy });
    if (isBusy) return;
    setIsBusy(true);
    setErrorMessage(null);

    try {
      const nickname = values.nickname?.trim();
      if (!nickname) {
        setErrorMessage('닉네임을 입력해 주세요.');
        return;
      }

      const code = readFreshCode();
      if (!code) {
        // 드물게 코드가 유실되었다면 다시 signup 목적 인가부터
        setPhase('redirecting');
        beginKakaoAuthorize('signup');
        return;
      }

      console.log('[Onboarding:signUp] 요청 전송', { url, code });
      const { ok, data, rawText } = await postJson<SignInResponse>(url, {
        nickname,
        redirectUri,
        token: code,
      });
      console.log('[Onboarding:signUp] 응답 수신', { ok, data, rawText });

      if (!ok || !data?.accessToken || !data?.user) {
        console.error('[Onboarding:signUp] ❌ 실패', { rawText });
        let msg = '회원가입에 실패했습니다. 다시 인증합니다.';
        try {
          const parsed = JSON.parse(rawText);
          if (parsed?.message) msg = parsed.message;
        } catch {}
        setErrorMessage(msg);

        // 코드 소모/에러 시 새 코드 재발급
        setPhase('redirecting');
        beginKakaoAuthorize('signup');
        return;
      }

      console.log('[Onboarding:signUp] ✅ 성공', { data });
      await update({
        accessToken: data.accessToken,
        needsOnboarding: false,
        user: {
          id: String(data.user.id),
          email: data.user.email,
          nickname: data.user.nickname,
          image: data.user.image,
          description: data.user.description,
        },
      });
      window.location.href = '/';
    } finally {
      setIsBusy(false);
    }
  };

  return { phase, isBusy, errorMessage, submitNickname };
};
