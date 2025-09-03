'use client';

import React from 'react';

import { LoadingNotice } from '@/components/oauth/LoadingNotice';
import { NicknameForm } from '@/components/oauth/NicknameForm';
import { useKakaoOnboardingFlow } from '@/hooks/useKakaoOnboardingFlow';
import { cn } from '@/lib/utils';

/** 카카오 온보딩 페이지 */
const OauthSignupPage = () => {
  const { phase, isBusy, errorMessage, submitNickname } = useKakaoOnboardingFlow();

  return (
    <div
      className={cn(
        'm-auto flex flex-col',
        'h-screen',
        'w-[335px] md:w-[440px] xl:w-[640px]',
        'py-[30px] md:py-[181px] xl:py-[93px]',
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
