'use server';

import { redirect } from 'next/navigation';

import { signIn as nextAuthSignIn } from '../auth';
import { CredentialsSignin, AuthError } from '../types/auth/authErrors'; // AuthError 계열 import

type Result = { success: true; redirectTo: string } | { success: false; error: string };

// 일반 회원가입 (CredentialsProvider 사용 시)
export async function signUp(formData: FormData) {
  const email = formData.get('email');
  const nickname = formData.get('nickname');
  const password = formData.get('password');
  const passwordConfirmation = formData.get('passwordConfirmation');

  const res = await fetch(`${process.env.API_BASE_URL}/${process.env.TEAM_ID}/auth/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return { success: false, error: errorData.message };
  }

  // 회원가입 성공 후 자동으로 로그인 처리
  try {
    // next-auth의 signIn 함수를 호출하여 'credentials' 프로바이더로 로그인
    const result = await nextAuthSignIn('credentials', {
      email,
      password,
      redirect: false, // 자동 리다이렉트 비활성
    });

    if (result?.error) {
      // CredentialsSignin 에러로 구분 가능
      if (result.error === 'CredentialsSignin') {
        return { success: false, error: '이메일 또는 비밀번호가 잘못되었습니다.' };
      }
      return { success: false, error: result.error };
    }

    // 로그인 성공 후 리다이렉트
    redirect('/');
  } catch (error) {
    // signIn 실패 시 에러 처리
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }

    if (error instanceof AuthError) {
      if (error instanceof CredentialsSignin) {
        return { error: '이메일 또는 비밀번호가 잘못되었습니다.' };
      }
      console.error('NextAuth AuthError:', error);
      return { error: '로그인에 실패했습니다.' };
    }

    console.error('NextAuth signIn failed:', error);
    return { error: '로그인에 실패했습니다.' };
  }
}

// 일반 로그인
export async function signIn(formData: FormData): Promise<Result> {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const r = await nextAuthSignIn('credentials', { email, password, redirect: false });
    if (r?.error) {
      return {
        success: false,
        error: r.error === 'CredentialsSignin' ? '잘못된 이메일 또는 비밀번호입니다.' : r.error,
      };
    }
    return { success: true, redirectTo: '/' };
  } catch {
    return { success: false, error: '로그인에 실패했습니다.' };
  }
}
