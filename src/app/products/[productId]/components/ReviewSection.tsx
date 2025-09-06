'use client';

import { useEffect, useState } from 'react';

import { getProductReviews } from '@/actions/review/review';
import NoReview from '@/assets/icon/ReviewState.svg';
import SortDropdown from '@/components/common/dropdowns/SortDropdown';
import { triggerStore } from '@/store/triggerStore';
import { ReviewDetail } from '@/types/review/review';

import ReviewCard from './ReviewCard';

const ReviewSection = ({ productId }: { productId: number }) => {
  const [option, setOption] = useState<string>('recent');
  const [productReviews, setProductReviews] = useState<ReviewDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { trigger } = triggerStore();

  const handleChangeOption = (value: string) => {
    setOption(value);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const reviews = await getProductReviews(productId, option);
        setProductReviews(reviews);
      } catch (error) {
        console.error('리뷰를 불러오는 데 실패했습니다:', error);
        setProductReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId, option, trigger]);

  return (
    <section>
      <div className='mb-5 flex justify-between'>
        <h2 className='text-mogazoa-18px-600 xl:text-mogazoa-20px-600'>상품리뷰</h2>
        <SortDropdown variant='review' onChange={handleChangeOption} option={option} />
      </div>
      {isLoading && (
        <div className='my-30 flex flex-col items-center justify-center gap-3 xl:my-40'>
          <NoReview className='w-[50px]' />
          <div className='text-mogazoa-20px-400 text-gray-6e6e82'>Loading...</div>
        </div>
      )}
      {!isLoading &&
        (productReviews?.length > 0 ? (
          <div className='flex flex-col gap-3'>
            {productReviews?.map((rev) => (
              <ReviewCard review={rev} productId={productId} key={rev.id} />
            ))}
          </div>
        ) : (
          <div className='my-30 flex flex-col items-center justify-center gap-3 xl:my-40'>
            <NoReview className='w-[50px]' />
            <div className='text-mogazoa-20px-400 text-gray-6e6e82'>첫 리뷰를 작성해 보세요!</div>
          </div>
        ))}
    </section>
  );
};

export default ReviewSection;
