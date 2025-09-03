import { NextResponse } from 'next/server';

import { auth } from './auth';

import type { NextRequest } from 'next/server';

const protectedRoutes = ['/mypage', '/compare', '/product', '/user'];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const pathname = req.nextUrl.pathname;
  const isProtected = protectedRoutes.some((r) => pathname.startsWith(r));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next(); // 통과
}
