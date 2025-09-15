import { NextResponse } from 'next/server';

import getFollowInfo from '@/actions/profile/getFollowInfo';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get('type');
  const cursor = url.searchParams.get('cursor');
  const userid = url.searchParams.get('userid');

  if (userid && cursor && (type === 'followers' || type === 'followees')) {
    const data = await getFollowInfo(type, Number(cursor), Number(userid));

    return NextResponse.json(data);
  }

  throw new Error('Unreachable');
}
