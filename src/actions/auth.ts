'use server';

import { redirect } from 'next/navigation';

import { signIn as nextAuthSignIn } from '../auth';

// 일반 회원가입 (CredentialsProvider 사용 시)
export async function signUp(formData: FormData) {
  const email = formData.get('email');
  const nickname = formData.get('nickname');
  const password = formData.get('password');
  const passwordConfirmation = formData.get('passwordConfirmation');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auth/signUp`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
    },
  );

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
      return { success: false, error: result.error };
    }

    // 로그인 성공 후 리다이렉트
    redirect('/');
  } catch (error) {
    // signIn 실패 시 에러 처리
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }

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
    // 백엔드 API 호출은 '../auth' 파일의 CredentialsProvider에서 처리됨
    const result = await nextAuthSignIn('credentials', {
      email,
      password,
      redirect: false, // 자동 리다이렉트 비활성
    });

    if (result?.error) {
      return { success: false, error: '잘못된 이메일 또는 비밀번호입니다.' };
    }
    console.log('로그인 성공');
    redirect('/');
  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }
    // signIn 실패 시 NextAuth는 throw 에러를 발생시킴
    if (error instanceof Error && error.message.includes('CredentialsSignin')) {
      return { error: '잘못된 이메일 또는 비밀번호입니다.' };
    }
    console.error('NextAuth signIn failed:', error);
    return { error: '로그인에 실패했습니다.' };
  }
}
