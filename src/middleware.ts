import { NextResponse } from 'next/server';

import { auth } from './auth';

import type { NextRequest } from 'next/server';

const protectedRoutes = ['/mypage', '/compare', '/product/{productId}', '/user/{userId}'];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const pathname = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}
