import { NextResponse } from 'next/server';

import fetcher from '@/lib/utils/fetcher';
import { ReviewResponse } from '@/types/review/review';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.TEST_TEAM_ID;

export async function GET(_: Request, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const idNum = Number(productId);
  if (!Number.isFinite(idNum)) {
    return NextResponse.json({ topReviews: [] }, { status: 400 });
  }

  try {
    const data = await fetcher(
      `${BASE_URL}/${TEAM_ID}/products/${idNum}/reviews?order=ratingDesc&limit=2`,
      {
        method: 'GET',
        next: { revalidate: 300, tags: ['reviews'] },
      },
    );

    const { list } = data as ReviewResponse;
    const topReviews = (list ?? []).slice(0, 2);
    return NextResponse.json({ topReviews }, { status: 200 });
  } catch {
    return NextResponse.json(
      { topReviews: [], error: '리뷰를 불러오는데 실패했습니다' },
      { status: 500 },
    );
  }
}
