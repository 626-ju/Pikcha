'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import {
  beginKakaoAuthorize,
  clearKakaoAuthCode,
  getBackendKakaoRedirectUri,
} from '@/lib/utils/kakao';
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
  const [needsFreshCode, setNeedsFreshCode] = useState(false); // signIn 실패로 코드 소모되었을 때 true

  // 1) 진입: 카카오 사용자면 2차 코드로 signIn 시도 → 성공: 기존, 실패: 신규(폼)
  useEffect(() => {
    if (status === 'loading') return;

    if (!isKakaoProvider(session) || shouldSkipOnboarding(session)) {
      setPhase('redirecting');
      router.replace('/');
      return;
    }

    (async () => {
      setPhase('probing');
      setErrorMessage(null);

      const code = readFreshCode();
      console.log('[Onboarding:init] code 확인:', code);

      if (!code) {
        // 2차 코드 없으면 발급 받으러 감
        console.log('[Onboarding:init] code 없음 → 재인가');
        setPhase('redirecting');
        beginKakaoAuthorize();
        return;
      }

      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL!;
      const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
      const redirectUri = getBackendKakaoRedirectUri();
      const url = `${apiBase}/${teamId}/auth/signIn/kakao`;

      console.log('[Onboarding:signIn] 요청 전송', { url, code, redirectUri });
      const { ok, data, rawText } = await postJson<SignInResponse>(url, {
        redirectUri,
        token: code,
      });
      console.log('[Onboarding:signIn] 응답 수신', { ok, data, rawText });

      if (ok && data?.accessToken && data.user) {
        console.log('[Onboarding:signIn] 기존 사용자 확인 완료');
        // 기존 가입자
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

        // 성공 후에만 code 제거
        console.log('[Onboarding] clearKakaoAuthCode 호출');
        clearKakaoAuthCode();

        setPhase('redirecting');
        router.replace('/');
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.location.pathname !== '/') {
            window.location.assign('/');
          }
        }, 50);
        return;
      }

      // 실패(대부분 미가입) → 폼으로. 이 때 code가 백엔드에서 소모됐을 가능성 큼
      setNeedsFreshCode(true);
      console.log('[Onboarding] code가 소모됨 → needsFreshCode=true');
      console.log('[Onboarding:signIn] 실패 → 신규 가입 플로우로');
      clearKakaoAuthCode();
      setPhase('form');
    })();
  }, [status, session, update, router]);

  // 2) 신규: 폼 제출 시 signUp 호출. code 없거나 소모되었으면 먼저 재인가
  const submitNickname = async (values: { nickname: string }) => {
    console.log('[Onboarding:signUp] 제출 시도', { values, isBusy, needsFreshCode });

    if (isBusy) return;
    setIsBusy(true);
    setErrorMessage(null);

    try {
      const nick = values.nickname?.trim();
      if (!nick) {
        setErrorMessage('닉네임을 입력해 주세요.');
        return;
      }

      const code = readFreshCode();
      console.log('[Onboarding:signUp] code 읽음', code);

      if (!code || needsFreshCode) {
        // signIn에서 실패했다면 code는 소모되었을 확률 ↑ → 새 코드부터 받자
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('pendingNickname', nick);
        }
        setPhase('redirecting');
        beginKakaoAuthorize();
        return;
      }

      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL!;
      const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
      const redirectUri = getBackendKakaoRedirectUri();
      const url = `${apiBase}/${teamId}/auth/signUp/kakao`;

      console.log('[Onboarding:signUp] 요청 전송', { url, code });

      const { ok, data, rawText } = await postJson<SignInResponse>(url, {
        nickname: nick,
        redirectUri,
        token: code,
      });
      console.log('[Onboarding:signUp] 응답 수신', { ok, data, rawText });

      if (!ok || !data?.accessToken || !data?.user) {
        // 실패 → 새 코드로 다시 받도록 유도
        setNeedsFreshCode(true);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('pendingNickname', nick);
        }
        try {
          const parsed = JSON.parse(rawText);
          setErrorMessage(parsed?.message ?? '회원가입에 실패했습니다. 다시 인증합니다.');
        } catch {
          setErrorMessage(rawText || '회원가입에 실패했습니다. 다시 인증합니다.');
        }
        setPhase('redirecting');
        beginKakaoAuthorize();
        return;
      }

      console.log('[Onboarding] 세션 업데이트 직전', {
        accessToken: data.accessToken,
        user: data.user,
      });
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

      console.log('[Onboarding] clearKakaoAuthCode 호출');
      // 성공 후 정리
      clearKakaoAuthCode();
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('pendingNickname');
      }
      setPhase('redirecting');
      router.replace('/');
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.location.pathname !== '/') {
          window.location.assign('/');
        }
      }, 50);
    } finally {
      setIsBusy(false);
    }
  };

  // 3) 새 코드로 돌아왔고 pendingNickname 있으면 자동 가입(UX 부드럽게)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const code = readFreshCode();
    const pending = sessionStorage.getItem('pendingNickname');
    if (!code || !pending) return;

    (async () => {
      setPhase('probing');
      setIsBusy(true);
      setErrorMessage(null);

      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL!;
      const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
      const redirectUri = getBackendKakaoRedirectUri();
      const url = `${apiBase}/${teamId}/auth/signUp/kakao`;

      const { ok, data, rawText } = await postJson<SignInResponse>(url, {
        nickname: pending,
        redirectUri,
        token: code,
      });

      if (!ok || !data?.accessToken || !data?.user) {
        try {
          const parsed = JSON.parse(rawText);
          setErrorMessage(parsed?.message ?? '회원가입에 실패했습니다.');
        } catch {
          setErrorMessage(rawText || '회원가입에 실패했습니다.');
        }
        setPhase('form');
        setIsBusy(false);
        return;
      }

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

      sessionStorage.removeItem('pendingNickname');
      console.log('[Onboarding] clearKakaoAuthCode 호출');
      clearKakaoAuthCode();
      setPhase('redirecting');
      router.replace('/');
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.location.pathname !== '/') {
          window.location.assign('/');
        }
      }, 50);
    })();
  }, [update, router]);

  return { phase, isBusy, errorMessage, submitNickname };
};
