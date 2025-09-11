'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import SigninForm from './(components)/SigninForm';
import SignupCTA from './(components)/SignupCTA';
import SnsSignin from './(components)/SnsSignin';

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
