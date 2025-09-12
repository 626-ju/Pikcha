'use client';

import React from 'react';

import { useKakaoOnboardingFlow } from '@/hooks/useKakaoOnboardingFlow';
import { cn } from '@/lib/utils';

import { LoadingNotice } from '../(components)/LoadingNotice';
import { NicknameForm } from '../(components)/NicknameForm';

/** 카카오 온보딩 페이지 */
const OauthSignupPage = () => {
  const { phase, isBusy, errorMessage, submitNickname } = useKakaoOnboardingFlow();

  return (
    <div
      className={cn(
        'm-auto flex flex-col',
        'h-screen pt-5',
        'w-[335px] md:w-[440px] xl:w-[640px]',
        'gap-[60px]',
      )}
    >
      {phase !== 'form' ? (
        <LoadingNotice />
      ) : (
        <NicknameForm onSubmit={submitNickname} isBusy={isBusy} errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default OauthSignupPage;
