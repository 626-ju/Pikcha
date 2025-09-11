'use client';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { type ProductDetail } from '@/types/product/productType';
import { type ReviewDetail } from '@/types/review/review';

import CompareReviewCell from './CompareReviewCell';

interface CompareReviewRowProps {
  products: [ProductDetail, ProductDetail];
}

const CompareReviewRow = ({ products }: CompareReviewRowProps) => {
  const [reviewsData, setReviewsData] = useState<[ReviewDetail[], ReviewDetail[]]>([[], []]);
  const [loading, setLoading] = useState(true);

  const productId1 = products[0].id;
  const productId2 = products[1].id;

  useEffect(() => {
    const controller = new AbortController();
    const fetchReviews = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch(`/api/reviews/${productId1}`, { signal: controller.signal }),
          fetch(`/api/reviews/${productId2}`, { signal: controller.signal }),
        ]);

        if (!res1.ok || !res2.ok) throw new Error('Failed to fetch reviews');

        const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
        setReviewsData([data1.topReviews ?? [], data2.topReviews ?? []]);
      } catch (e) {
        if (e instanceof Error && e.name !== 'AbortError') {
          toast.error('리뷰 데이터를 불러올 수 없습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
    return () => controller.abort();
  }, [productId1, productId2]);

  return (
    <tr>
      <td className='text-mogazoa-16px-400 text-gray-9fa6b2 w-1/4 px-[40px] py-7 text-center'>
        리뷰
      </td>
      <CompareReviewCell product={products[0]} reviews={reviewsData[0]} loading={loading} />
      <CompareReviewCell product={products[1]} reviews={reviewsData[1]} loading={loading} />
      <td className='text-mogazoa-16px-400 text-gray-9fa6b2 w-1/4 px-[40px] py-7 text-center'></td>
    </tr>
  );
};

export default CompareReviewRow;
