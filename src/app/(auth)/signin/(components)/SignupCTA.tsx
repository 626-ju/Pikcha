'use client';

import React from 'react';

import Link from 'next/link';

/** 회원가입 유도 문구 */
const SignupCTA = () => {
  return (
    <div className='text-gray-6e6e82 my-5 px-5 text-center'>
      <p>
        아직 회원이 아니신가요?{' '}
        <Link href='/signup' className='underline'>
          지금 바로 가입해 보세요!
        </Link>
      </p>
    </div>
  );
};

export default SignupCTA;
