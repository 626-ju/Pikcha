import { useEffect, useState } from 'react';

import { toast } from 'sonner';

import FavoriteIcon from '@/assets/icon/Icon-favorite.svg';
import ReviewIcon from '@/assets/icon/Icon-review.svg';
import StarIcon from '@/assets/icon/Icon-star.svg';
import StarDisplay from '@/components/ui/StarDisplay';
import { type ComparisonResult } from '@/types/compare/compareType';
import { type ProductDetail } from '@/types/product/productType';
import { type ReviewDetail } from '@/types/review/review';

import CompareReviewRow from './CompareReviewRow';
import CompareTableRow from './CompareTableRow';

interface CompareTableProps {
  products: [ProductDetail, ProductDetail];
  comparisonResult: ComparisonResult;
}

const COMPARISON_METRICS = [
  { label: '별점', key: 'rating' as const },
  { label: '찜 개수', key: 'favoriteCount' as const },
  { label: '리뷰 개수', key: 'reviewCount' as const },
];

const ICON_MAP = {
  별점: <StarIcon className='text-yellow-ffc83c mr-2 inline h-4 w-4' />,
  '찜 개수': <FavoriteIcon className='text-red-ff2f9f mr-2 inline h-4 w-4' />,
  '리뷰 개수': <ReviewIcon className='mr-2 inline h-4 w-4' />,
} as const;

const CompareTable = ({ products, comparisonResult }: CompareTableProps) => {
  const headerCellClass = 'text-mogazoa-16px-400 text-gray-9fa6b2 w-1/4 py-5 text-center';
  const [reviewsData, setReviewsData] = useState<[ReviewDetail[], ReviewDetail[]]>([[], []]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const productId1 = products[0].id;
  const productId2 = products[1].id;

  // 모바일용 리뷰 데이터 가져오기
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
        setReviewsLoading(false);
      }
    };

    fetchReviews();
    return () => controller.abort();
  }, [productId1, productId2]);

  // 각 영화별 색상 가져오기 (데스크톱 버전과 동일)
  const getProductColorClass = (product: ProductDetail) => {
    return product.id === products[0].id ? 'text-[#05D58B]' : 'text-[#FF2F9F]';
  };

  const getProductBgClass = (product: ProductDetail) => {
    return product.id === products[0].id
      ? 'bg-[#05D58B]/10 border-[#05D58B]/30'
      : 'bg-[#FF2F9F]/10 border-[#FF2F9F]/30';
  };

  // 모바일용 메트릭 카드 컴포넌트
  const MetricCard = ({ metric }: { metric: (typeof COMPARISON_METRICS)[0] }) => {
    const detail = comparisonResult.details[metric.key];
    const winner = detail.winner as ProductDetail | null;
    const icon = ICON_MAP[metric.label as keyof typeof ICON_MAP];

    return (
      <div className='bg-black-252530 space-y-3 rounded-lg p-4'>
        <h3 className='text-mogazoa-16px-600 text-gray-9fa6b2 flex items-center justify-center text-center'>
          {icon}
          {metric.label}
        </h3>
        <div className='space-y-2'>
          {products.map((product, productIndex) => {
            const value = productIndex === 0 ? detail.value1 : detail.value2;
            const isWinner = winner?.id === product.id;
            return (
              <div
                key={product.id}
                className={`flex items-center justify-between rounded border p-2 ${
                  isWinner ? getProductBgClass(product) : 'bg-black-353542/30 border-transparent'
                }`}
              >
                <span className='text-mogazoa-14px-400 text-gray-9fa6b2 flex-1 truncate'>
                  {product.name}
                </span>
                <span
                  className={`text-mogazoa-14px-600 ${
                    isWinner ? getProductColorClass(product) : 'text-gray-9fa6b2'
                  }`}
                >
                  {metric.key === 'rating' ? value.toFixed(1) : value.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
        {winner && (
          <div className='text-center'>
            <span className={`text-mogazoa-12px-400 ${getProductColorClass(winner)}`}>
              {winner.name} 승리 🎉
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* 데스크톱용 테이블 */}
      <div className='bg-black-252530 hidden rounded-lg md:block'>
        <table className='w-full table-fixed'>
          <thead>
            <tr className='border-black-353542 border-b'>
              <th className={`${headerCellClass.replace('w-1/4', 'w-[20%]')}`}>기준</th>
              <th className={`${headerCellClass.replace('w-1/4', 'w-[27.5%]')}`}>
                {products[0].name}
              </th>
              <th className={`${headerCellClass.replace('w-1/4', 'w-[27.5%]')}`}>
                {products[1].name}
              </th>
              <th className={headerCellClass}>결과</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_METRICS.map((metric) => (
              <CompareTableRow
                key={metric.key}
                label={metric.label}
                value1={comparisonResult.details[metric.key].value1}
                value2={comparisonResult.details[metric.key].value2}
                winner={comparisonResult.details[metric.key].winner as ProductDetail | null}
                products={products}
              />
            ))}
            <CompareReviewRow products={products} />
          </tbody>
        </table>
      </div>

      {/* 모바일용 카드 레이아웃 */}
      <div className='space-y-4 md:hidden'>
        {COMPARISON_METRICS.map((metric) => (
          <MetricCard key={metric.key} metric={metric} />
        ))}

        {/* 모바일용 리뷰 섹션 */}
        <div className='bg-black-252530 rounded-lg p-4'>
          <h3 className='text-mogazoa-16px-600 text-gray-9fa6b2 mb-4 flex items-center justify-center text-center'>
            <ReviewIcon className='mr-2 inline h-4 w-4' />
            리뷰
          </h3>
          {reviewsLoading ? (
            <div className='text-mogazoa-14px-400 text-gray-9fa6b2 py-4 text-center'>
              리뷰 로딩 중...
            </div>
          ) : (
            <div className='space-y-4'>
              {products.map((product, productIndex) => {
                const productReviews = reviewsData[productIndex];
                const productColorClass = getProductColorClass(product);

                return (
                  <div key={product.id} className='space-y-3'>
                    <h4 className={`text-mogazoa-14px-600 ${productColorClass} truncate`}>
                      {product.name}
                    </h4>

                    {productReviews.length > 0 ? (
                      <div className='space-y-2'>
                        {productReviews.map((review) => (
                          <div key={review.id} className='bg-black-353542/30 rounded p-3'>
                            <div className='mb-2 flex items-center justify-between'>
                              <StarDisplay rating={review.rating} size='sm' />
                              <span className='text-mogazoa-12px-300 text-gray-6e6e82'>
                                {review.rating}점
                              </span>
                            </div>
                            <p className='text-mogazoa-12px-400 text-gray-9fa6b2 line-clamp-2'>
                              {review.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='bg-black-353542/30 rounded p-3'>
                        <p className='text-mogazoa-12px-400 text-gray-6e6e82 text-center'>
                          리뷰가 없습니다
                        </p>
                      </div>
                    )}

                    {product.reviewCount > 2 && (
                      <div className='text-center'>
                        <a
                          href={`/products/${product.id}`}
                          className='text-mogazoa-12px-300 text-gray-6e6e82 hover:text-gray-9fa6b2 underline'
                        >
                          더 많은 리뷰 확인하러가기
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CompareTable;
