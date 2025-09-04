import Link from 'next/link';

import StarDisplay from '@/components/ui/StarDisplay';
import { type Product } from '@/types/product/productType';
import { type ReviewDetail } from '@/types/review/review';

interface CompareReviewCellProps {
  product: Product;
  reviews: ReviewDetail[];
  loading: boolean;
}

const CompareReviewCell = ({ product, reviews, loading }: CompareReviewCellProps) => {
  return (
    <td className='align-center text-gray-9fa6b2 w-1/4 p-4 text-center'>
      <div className='space-y-4'>
        {loading ? (
          <div className='text-mogazoa-14px-300 text-gray-9fa6b2'>리뷰 로딩 중...</div>
        ) : reviews.length > 0 ? (
          <div className='space-y-2'>
            {reviews.map((review) => (
              <div key={review.id}>
                <StarDisplay rating={review.rating} size='sm' className='justify-start' />
                <div className='text-gray-9fa6b2 text-mogazoa-14px-300 max-w-32 truncate pt-1 text-left'>
                  {review.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-gray-9fa6b2 text-mogazoa-14px-300'>리뷰가 없습니다</div>
        )}

        {product.reviewCount > 2 && (
          <Link
            href={`/products/${product.id}`}
            className='text-mogazoa-12px-300 text-black-6e6e82 hover:text-gray-9fa6b2 mt-2 block text-right underline'
          >
            더 많은 리뷰 확인하러가기
          </Link>
        )}
      </div>
    </td>
  );
};

export default CompareReviewCell;
