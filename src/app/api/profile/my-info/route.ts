import { NextResponse } from 'next/server';

import { getMyInfo } from '@/actions/profile/getUserInfo';

export async function GET() {
  const data = await getMyInfo();
  return NextResponse.json(data);
}
