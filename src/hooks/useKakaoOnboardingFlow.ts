'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import {
  beginKakaoAuthorize,
  // clearKakaoAuthCode,
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
      //완전 의심 -> setPhase 비동기니까 router.replace가 먼저 먹겠네
      // setPhase('redirecting');
      router.replace('/');
      return;
    }

    if (!session?.user?.id) {
      // 세션에 이미 사용자 정보가 없으면 굳이 signIn 시도하지 않고 바로 form
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
        //여기서  postJson으로 토큰으로 넘겨주기
        //ok,data,rawText 써야하는 거면 network.ts안에서 방어하기
        //아니면 마운트 시에 아래에 있는 거 실행안해도 될테니까
        //이거 위에서 early return으로 끊기
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

        // id 일때는 로그인 성공
        // 닉네임에

        // 성공 후에만 code 제거
        console.log('[Onboarding] clearKakaoAuthCode 호출');
        // clearKakaoAuthCode();
        /*
          if (typeof window !== 'undefined') {
            window.history.replaceState({}, '', window.location.pathname);
          }
        */
        // -------------------------------------------------------------------------------------------------------------------------------------------------------
        // setPhase('redirecting');
        router.replace('/');
        // setTimeout(() => {
        //   if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        //     window.location.assign('/');
        //   }
        // }, 50);
        return;
      }

      // 실패(대부분 미가입) → 폼으로. 이 때 code가 백엔드에서 소모됐을 가능성 큼
      setNeedsFreshCode(true);
      console.log('[Onboarding] code가 소모됨 → needsFreshCode=true');
      console.log('[Onboarding:signIn] 실패 → 신규 가입 플로우로');
      // clearKakaoAuthCode();
      /*
        if (typeof window !== 'undefined') {
          window.history.replaceState({}, '', window.location.pathname);
        }
      */

      setPhase('form');
    })();
  }, [status, session, update, router]); //업데이트 auth에서 제공해주는 메서드인거죠? 거니까 바뀔 일 없지 않을까요? 라우터도

  // 2) 신규: 폼 제출 시 signUp 호출. code 없거나 소모되었으면 먼저 재인가
  const submitNickname = async (values: { nickname: string }) => {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
    const redirectUri = getBackendKakaoRedirectUri();
    const url = `${apiBase}/${teamId}/auth/signUp/kakao`;
    console.log('[Onboarding:signUp] 제출 시도', { values, isBusy, needsFreshCode });

    if (isBusy) return; //if (isBusy || phase === 'redirecting') return;
    setIsBusy(true);
    setErrorMessage(null);

    try {
      const nick = values.nickname?.trim();
      console.log('😢😢😢😢😢😢 닉네임이야::', nick);
      if (!nick) {
        setErrorMessage('닉네임을 입력해 주세요.');
        return; // 1) 닉네임 제대로 넘어가고 있는가?
      }

      if (typeof window === 'undefined') {
        console.log('이거 서버에서 돌지롱');
        return;
      }
      const code = readFreshCode();
      console.log('[Onboarding:signUp] code 읽음', code);

      if (!code || needsFreshCode) {
        // signIn에서 실패했다면 code는 소모되었을 확률 ↑ → 새 코드부터 받자
        // if (typeof window !== 'undefined') {
        //   // sessionStorage.setItem('pendingNickname', nick);
        // }
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
        // 실패 → 새 코드로 다시 받도록 유도
        console.log(data);
        setNeedsFreshCode(true);
        if (typeof window !== 'undefined') {
          // sessionStorage.setItem('pendingNickname', nick);
        }
        // try {
        // }
        console.log('👍👍실패 :', rawText);
        const parsed = JSON.parse(rawText);
        setErrorMessage(parsed?.message ?? '회원가입에 실패했습니다. 다시 인증합니다.');
        // catch {
        //   console.log('👍👍 :', rawText);
        //   setErrorMessage(rawText || '회원가입에 실패했습니다. 다시 인증합니다.');
        // }
        setPhase('redirecting');
        beginKakaoAuthorize();
        return;
      }

      //가입이 되는데 폼이 한번 더 떠서 그런거 아닌가요 지금? /-> 폼이 지금 제출되고 응답에 성공했으면

      //리다이렉트가 제대로 되어야 한느데 -> 이게 제대로 안넘어가고 -> 인가코드도 새로 받아옴 ->
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
      // 성공 후 정리
      // clearKakaoAuthCode();
      if (typeof window !== 'undefined') {
        // sessionStorage.removeItem('pendingNickname');
        //  window.history.replaceState({}, '', window.location.pathname);
      }
      // setPhase('redirecting');
      router.replace('/');
      // setTimeout(() => {
      //   if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      //     window.location.assign('/');
      //   }
      // }, 50);
    } finally {
      setIsBusy(false);
    }
  };

  //닉네임 폼에 입력했을 때 세션스토리지에 보관(폼 핸들러에서)

  //실패했을 때의 -> 닉네임 중복되었을 때?//  -> 세션에 보관해놨으니까 -> 닉네임
  // -> 정리하면 폼에서 실패해도 이미 소모된 상태인데 -> 아래에서 소모된 인가코드로 재요청을 보내니까 계속 에러 발생!
  //-> 왜 실패가 뜨는지?

  //여기서는 닉네임 다시 가져와서 자동으로 다시 요청하게

  // 3) 새 코드로 돌아왔고 pendingNickname 있으면 자동 가입(UX 부드럽게)
  // useEffect(() => {
  //   if (typeof window === 'undefined') return;
  //   const code = readFreshCode();
  //   const pending = sessionStorage.getItem('pendingNickname');
  //   if (!code || !pending) return;

  //   (async () => {
  //     setPhase('probing');
  //     setIsBusy(true);
  //     setErrorMessage(null);

  //     const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL!;
  //     const teamId = process.env.NEXT_PUBLIC_TEAM_ID!;
  //     const redirectUri = getBackendKakaoRedirectUri();
  //     const url = `${apiBase}/${teamId}/auth/signUp/kakao`;

  //     //callback 인가코드
  //     //오오스 카카오 인가코드 -> 폼 제출 핸들러 내부에서 소모 중
  //     //

  //     const { ok, data, rawText } = await postJson<SignInResponse>(url, {
  //       nickname: pending,
  //       redirectUri,
  //       token: code,
  //     });

  //     if (!ok || !data?.accessToken || !data?.user) {
  //       try {
  //         //여기서 실패 중
  //         const parsed = JSON.parse(rawText);
  //         setErrorMessage(parsed?.message ?? '회원가입에 실패했습니다.');
  //       } catch {
  //         setErrorMessage(rawText || '회원가입에 실패했습니다.');
  //       }
  //       setPhase('form');
  //       setIsBusy(false);
  //       return;
  //     }

  //     await update({
  //       accessToken: data.accessToken,
  //       needsOnboarding: false,
  //       user: {
  //         id: String(data.user.id),
  //         email: data.user.email,
  //         nickname: data.user.nickname,
  //         image: data.user.image,
  //         description: data.user.description,
  //       },
  //     });

  //     sessionStorage.removeItem('pendingNickname');
  //     console.log('[Onboarding] clearKakaoAuthCode 호출');
  //     clearKakaoAuthCode();
  //     /*
  //       if (typeof window !== 'undefined') {
  //         window.history.replaceState({}, '', window.location.pathname);
  //       }
  //     */
  //     setPhase('redirecting');
  //     router.replace('/');
  //     setTimeout(() => {
  //       if (typeof window !== 'undefined' && window.location.pathname !== '/') {
  //         window.location.assign('/');
  //       }
  //     }, 50);
  //   })();
  // }, [update, router]);

  return { phase, isBusy, errorMessage, submitNickname };
};
