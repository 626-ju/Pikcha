import { NextResponse } from 'next/server';

import fetcher from '@/lib/utils/fetcher';
import { ProductDetail } from '@/types/product/productType';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.TEST_TEAM_ID;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idsParam = searchParams.get('ids') ?? '';
  const forceRefresh = searchParams.get('force') === 'true';

  if (!idsParam) {
    return NextResponse.json({ list: [] }, { status: 200 });
  }

  const ids = Array.from(
    new Set(
      idsParam
        .split(',')
        .map((v) => Number(v.trim()))
        .filter((n) => Number.isFinite(n)),
    ),
  );

  try {
    const promises = ids.map(async (id) => {
      try {
        const fetchOptions = forceRefresh
          ? {
              method: 'GET',
              cache: 'no-store' as const,
            }
          : {
              method: 'GET',
              next: { revalidate: 300, tags: [`product-${id}`, 'compare-products'] },
            };

        const product = await fetcher(`${BASE_URL}/${TEAM_ID}/products/${id}`, fetchOptions);
        return product as ProductDetail;
      } catch {
        return null;
      }
    });

    const results = await Promise.all(promises);
    const list = results.filter((p): p is ProductDetail => p !== null);
    return NextResponse.json({ list }, { status: 200 });
  } catch {
    return NextResponse.json(
      { list: [], error: '영화를 불러오는데 실패했습니다' },
      { status: 500 },
    );
  }
}
