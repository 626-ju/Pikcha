'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { beginKakaoAuthorize, getBackendKakaoRedirectUri } from '@/lib/utils/kakao';
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
  //이게 인가코드 뽑아오는 거
  if (typeof window === 'undefined') return null;
  //  //-> code에 널 찍힘
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

    const code = readFreshCode();
    if (!code) {
      beginKakaoAuthorize();
      return;
    }

    if (!isKakaoProvider(session) || shouldSkipOnboarding(session)) {
      router.replace('/');
      return;
    }

    if (!session?.accessToken) {
      // 백엔드 액세스토큰이 없다 = 아직 회원가입 안 된 상태
      setPhase('form');
      return;
    }

    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
    const redirectUri = getBackendKakaoRedirectUri(); //현재 오리진 붙여서 이동할 uri에 얻어오는 거
    const url = `${apiBase}/${teamId}/auth/signIn/kakao`; //여기가 그 우리가 쓰는 백엔드 api 주소죠?

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
          //세션 업데이트 할 때 쓰는 건가?
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
        window.location.href = '/';

        return;
      }

      // 실패(대부분 미가입) → 폼으로. 이 때 code가 백엔드에서 소모됐을 가능성 큼
      setNeedsFreshCode(true);
      console.log('[Onboarding] code가 소모됨 → needsFreshCode=true');
      console.log('[Onboarding:signIn] 실패 → 신규 가입 플로우로');

      setPhase('form');
    })();
  }, [status, session, update, router]);

  // 2) 신규: 폼 제출 시 signUp 호출. code 없거나 소모되었으면 먼저 재인가
  const submitNickname = async (values: { nickname: string }) => {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
    const redirectUri = getBackendKakaoRedirectUri();
    const url = `${apiBase}/${teamId}/auth/signUp/kakao`;
    console.log('[Onboarding:signUp] 제출 시도', { values, isBusy, needsFreshCode });

    if (isBusy) return;
    setIsBusy(true);
    setErrorMessage(null);

    try {
      const nick = values.nickname?.trim();
      console.log('😢😢😢😢😢😢 닉네임이야::', nick);
      if (!nick) {
        setErrorMessage('닉네임을 입력해 주세요.');
        return;
      }

      if (typeof window === 'undefined') {
        console.log('이거 서버에서 돌지롱');
        return;
      }
      const code = readFreshCode();
      console.log('[Onboarding:signUp] code 읽음', code);

      if (!code || needsFreshCode) {
        // signIn에서 실패했다면 code는 소모되었을 확률 ↑ → 새 코드부터 받자
        setPhase('redirecting');
        beginKakaoAuthorize(); //인가코드 다시 가져오기
        return;
      }

      console.log('[Onboarding:signUp] 요청 전송', { url, code });

      // (여기서 첫 마운트 시 여기 실행 안되게 어을리 리턴)
      const { ok, data, rawText } = await postJson<SignInResponse>(url, {
        nickname: nick,
        redirectUri,
        token: code,
      });
      console.log('[Onboarding:signUp] 응답 수신', { ok, data, rawText });

      if (!ok && !data?.accessToken && !data?.user) {
        console.log(ok);
        console.log(data?.accessToken);
        console.log(data?.user);
        console.log(data);
        setNeedsFreshCode(true);
        if (typeof window !== 'undefined') {
        }

        console.log('👍👍실패 :', rawText);
        const parsed = JSON.parse(rawText);
        setErrorMessage(parsed?.message ?? '회원가입에 실패했습니다. 다시 인증합니다.');

        setPhase('redirecting');
        beginKakaoAuthorize();
        return;
      }

      if (!data?.accessToken || !data?.user) return;

      console.log('👍👍성공 :', rawText);
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
      if (typeof window !== 'undefined') {
      }
      window.location.href = '/';
    } finally {
      setIsBusy(false);
    }
  };

  return { phase, isBusy, errorMessage, submitNickname };
};
