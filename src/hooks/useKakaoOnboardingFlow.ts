'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
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

/** 카카오 온보딩 상태 결정 + 제출 처리 */
export const useKakaoOnboardingFlow = (): UseKakaoOnboardingFlowResult => {
  const { data: session, update, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [phase, setPhase] = useState<Phase>('probing');
  const [isBusy, setIsBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const didRunPreflight = useRef(false);
  const authCode = useMemo(() => searchParams.get('code'), [searchParams]);

  // 진입 시 기존 사용자면 바로 홈, 신규면 폼
  useEffect(() => {
    if (didRunPreflight.current) return;
    if (status === 'loading') return;
    if (!isKakaoProvider(session)) return;

    // 온보딩 완료 사용자 → 홈
    if (shouldSkipOnboarding(session)) {
      didRunPreflight.current = true;
      setPhase('redirecting');
      router.replace('/');
      setTimeout(() => {
        if (location.pathname !== '/') window.location.assign('/');
      }, 100);
      return;
    }

    didRunPreflight.current = true;
    setPhase('probing');

    (async () => {
      try {
        if (!authCode) {
          beginKakaoAuthorize();
          return;
        }

        const redirectUri = getBackendKakaoRedirectUri();
        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL!;
        const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
        const url = `${apiBase}/${teamId}/auth/signIn/kakao`;

        const { ok, data } = await postJson<SignInResponse>(url, {
          redirectUri,
          token: authCode,
        });

        clearKakaoAuthCode();

        if (ok && data && data.user?.nickname) {
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

          setPhase('redirecting');
          router.replace('/');
          setTimeout(() => {
            if (location.pathname !== '/') window.location.assign('/');
          }, 100);
          return;
        }

        setPhase('form');
      } catch {
        // 실패해도 폼으로 진행
        setPhase('form');
      }
    })();
  }, [status, session, router, update, authCode]);

  const submitNickname = async (values: { nickname: string }) => {
    if (isBusy) return;
    setIsBusy(true);
    setErrorMessage(null);

    try {
      if (!authCode) {
        beginKakaoAuthorize();
        return;
      }

      const nickname = values.nickname?.trim();
      if (!nickname) {
        setErrorMessage('닉네임을 입력해 주세요.');
        return;
      }

      const redirectUri = getBackendKakaoRedirectUri();
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL!;
      const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
      const url = `${apiBase}/${teamId}/auth/signUp/kakao`;

      const { ok, data, rawText } = await postJson<SignInResponse>(url, {
        nickname,
        redirectUri,
        token: authCode,
      });

      if (!ok || !data) {
        setErrorMessage(
          // 백엔드 메시지 우선
          ((): string => {
            try {
              const parsed = JSON.parse(rawText);
              return parsed?.message ?? '회원가입에 실패했습니다.';
            } catch {
              return rawText || '회원가입에 실패했습니다.';
            }
          })(),
        );
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

      clearKakaoAuthCode();
      setPhase('redirecting');
      router.replace('/');
      setTimeout(() => {
        if (location.pathname !== '/') window.location.assign('/');
      }, 100);
    } finally {
      // 로깅은 외부 모니터링 도구로 위임
      setIsBusy(false);
    }
  };

  return { phase, isBusy, errorMessage, submitNickname };
};
