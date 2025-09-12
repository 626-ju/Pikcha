import { NextResponse } from 'next/server';

import { auth } from './auth';

import type { NextRequest } from 'next/server';

const protectedRoutes = ['/mypage', '/compare', '/user'];
const authRoutes = ['/signin', '/signup'];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const pathname = req.nextUrl.pathname;
  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));
  const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));

  // 로그인전 접근제한(리다이렉트)
  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // 로그인 후 접근제한(리다이렉트)
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  //로그인한 유저가 user/자기 자신 아이디 들어가려고 할 때
  const match = pathname.match(/^\/user\/([^/]+)/);
  if (match && session) {
    const useridFromUrl = match[1];

    if (session.user.id === useridFromUrl) {
      return NextResponse.redirect(new URL('/mypage', req.url));
    }
  }

  return NextResponse.next();
}
