import React from 'react';

import BicLogo from '@/components/common/BigLogo';

import SignupForm from './(components)/SignupForm';

/** 회원가입 페이지(컴포넌트 분리 버전) */
const SignupPage = () => {
  return (
    <>
      <BicLogo />
      <SignupForm />
    </>
  );
};

export default SignupPage;
