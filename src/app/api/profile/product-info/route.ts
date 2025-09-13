import { NextResponse } from 'next/server';

import { getUserProducts } from '@/actions/profile/getUserProducts';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userid = url.searchParams.get('userid');
  const option = url.searchParams.get('option');
  const cursor = url.searchParams.get('cursor');

  if (userid && cursor && option) {
    const data = await getUserProducts(Number(userid), option, Number(cursor));

    return NextResponse.json(data);
  }

  throw new Error('Unreachable');
}
