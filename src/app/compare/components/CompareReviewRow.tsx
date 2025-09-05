import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import { getProductReviews } from '@/actions/review/review';
import { type Product } from '@/types/product/productType';
import { type ReviewDetail } from '@/types/review/review';

import CompareReviewCell from './CompareReviewCell';

interface CompareReviewRowProps {
  products: [Product, Product];
}

const CompareReviewRow = ({ products }: CompareReviewRowProps) => {
  const [product1, product2] = products;
  const [reviews1, setReviews1] = useState<ReviewDetail[]>([]);
  const [reviews2, setReviews2] = useState<ReviewDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const [reviewsData1, reviewsData2] = await Promise.all([
          getProductReviews(product1.id, 'ratingDesc'),
          getProductReviews(product2.id, 'ratingDesc'),
        ]);
        setReviews1(reviewsData1.slice(0, 2));
        setReviews2(reviewsData2.slice(0, 2));
      } catch {
        toast.error('리뷰 데이터를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [product1.id, product2.id]);

  return (
    <tr>
      <td className='text-mogazoa-16px-400 text-gray-9fa6b2 w-1/4 px-[40px] py-7 text-center'>
        리뷰
      </td>
      <CompareReviewCell product={product1} reviews={reviews1} loading={loading} />
      <CompareReviewCell product={product2} reviews={reviews2} loading={loading} />
    </tr>
  );
};

export default CompareReviewRow;
