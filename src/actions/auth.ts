'use server';

import { redirect } from 'next/navigation';

import { signIn as nextAuthSignIn } from '@/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 일반 회원가입 (CredentialsProvider 사용 시)
export async function signUp(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const res = await fetch(`${API_BASE_URL}/auth/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return { error: errorData.message };
  }

  // 회원가입 성공 후 자동으로 로그인 처리
  try {
    // next-auth의 signIn 함수를 호출하여 'credentials' 프로바이더로 로그인
    await nextAuthSignIn('credentials', {
      email,
      password,
      redirect: false, // 로그인 성공 후 자동으로 리다이렉트하지 않도록 설정
    });

    // 로그인 성공 후 리다이렉트
    redirect('/');
  } catch (error) {
    // signIn 실패 시 에러 처리
    console.error('NextAuth signIn failed:', error);
    return { error: '로그인에 실패했습니다.' };
  }
}

// 일반 로그인
export async function signIn(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    // next-auth의 signIn 함수를 호출하여 'credentials' 프로바이더로 로그인
    // 백엔드 API 호출은 '@/auth' 파일의 CredentialsProvider에서 처리됨
    await nextAuthSignIn('credentials', {
      email,
      password,
      redirectTo: '/', // 로그인 성공 후 리다이렉트
    });
  } catch (error) {
    // signIn 실패 시 NextAuth는 throw 에러를 발생시킴
    if (error instanceof Error && error.message.includes('CredentialsSignin')) {
      return { error: '잘못된 이메일 또는 비밀번호입니다.' };
    }
    console.error('NextAuth signIn failed:', error);
    return { error: '로그인에 실패했습니다.' };
  }
}
