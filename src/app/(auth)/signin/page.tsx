'use client';

import React from 'react';

import SigninForm from '@/components/auth/SigninForm';
import SignupCTA from '@/components/auth/SignupCTA';
import SnsSignin from '@/components/auth/SnsSignin';
import { cn } from '@/lib/utils';

/** 로그인 페이지 */
const SigninPage = () => {
  return (
    <>
      <SigninForm />
      <SignupCTA />
      <hr
        className={cn(
          'mx-auto',
          'border-gray-6e6e82 my-5 border-t',
          'w-[335px]',
          'md:w-[440px]',
          'xl:w-[640px]',
          'opacity-20',
        )}
      />
      <SnsSignin />
    </>
  );
};

export default SigninPage;
