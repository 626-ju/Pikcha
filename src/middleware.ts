import { NextResponse } from 'next/server';

import { auth } from './auth';

import type { NextRequest } from 'next/server';

const protectedRoutes = ['/mypage', '/compare', '/product', '/user']; // 인증 필요한 경로 목록

export default async function middleware(req: NextRequest) {
  const session = await auth(); // 세션 확인
  const pathname = req.nextUrl.pathname;
  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/signin', req.url)); // 세션 없으면 로그인 페이지로
  }

  return NextResponse.next(); // 통과
}
