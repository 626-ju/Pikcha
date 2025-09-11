import Link from 'next/link';

import StarDisplay from '@/components/ui/StarDisplay';
import { type ProductDetail } from '@/types/product/productType';
import { type ReviewDetail } from '@/types/review/review';

interface CompareReviewCellProps {
  product: ProductDetail;
  reviews: ReviewDetail[];
  loading: boolean;
}

const MAX_VISIBLE_REVIEWS = 2;

const CompareReviewCell = ({ product, reviews, loading }: CompareReviewCellProps) => {
  const cellTextClass = 'text-gray-9fa6b2 text-mogazoa-14px-300';

  return (
    <td className='text-gray-9fa6b2 w-1/4 p-4 text-center align-top'>
      <div className='space-y-4'>
        {loading ? (
          <div className={cellTextClass}>리뷰 로딩 중...</div>
        ) : reviews.length > 0 ? (
          <div className='space-y-2'>
            {reviews.map((review) => (
              <div key={review.id}>
                <StarDisplay rating={review.rating} size='sm' className='justify-center' />
                <div className={`${cellTextClass} truncate pt-1 text-center`}>{review.content}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={cellTextClass}>리뷰가 없습니다</div>
        )}

        {product.reviewCount > MAX_VISIBLE_REVIEWS && (
          <Link
            href={`/products/${product.id}`}
            className='text-mogazoa-12px-300 text-gray-6e6e82 hover:text-gray-9fa6b2 mt-2 block text-center underline'
          >
            더 많은 리뷰 확인하러가기
          </Link>
        )}
      </div>
    </td>
  );
};

export default CompareReviewCell;
