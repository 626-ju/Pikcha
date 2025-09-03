'use client';

import React, { useState } from 'react';

import { signIn as nextAuthSignIn } from 'next-auth/react';

import { registerKakaoOauthApp } from '@/actions/oauth';
import KakaoIcon from '@/assets/icon/status=kakao.svg';

/** SNS(카카오) 로그인 섹션 */
const SnsSignin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleKakao = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const result = await registerKakaoOauthApp();
      if (!result.ok) {
        setErrorMessage(result.error ?? '카카오 앱 등록에 실패했습니다.');
        setIsLoading(false);
        return;
      }

      await nextAuthSignIn('kakao', { callbackUrl: '/oauth/kakao' });
    } finally {
      // 실제 리디렉션이 진행되므로 여기서 로딩 해제는 의미 없을 수 있음
      setIsLoading(false);
    }
  };

  return (
    <div className='my-5 flex flex-col gap-5'>
      <p className='text-gray-6e6e82 text-center'>SNS로 바로 시작하기</p>

      <div className='flex items-center justify-center gap-5'>
        <button
          type='button'
          onClick={handleKakao}
          disabled={isLoading}
          className='border-black-353542 rounded-full border p-[14px] disabled:opacity-50'
          aria-label='카카오로 로그인'
        >
          <KakaoIcon className='h-full w-full' />
        </button>
      </div>

      {errorMessage && <p className='text-center text-sm text-red-500'>{errorMessage}</p>}
    </div>
  );
};

export default SnsSignin;
