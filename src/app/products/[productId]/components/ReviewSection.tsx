'use client';

import { useEffect, useRef, useState } from 'react';

import { getProductReviews } from '@/actions/review/review';
import NoReview from '@/assets/icon/ReviewState.svg';
import SortDropdown from '@/components/common/dropdowns/SortDropdown';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { triggerStore } from '@/store/triggerStore';
import { ReviewDetail } from '@/types/review/review';

import ReviewCard from './ReviewCard';

const ReviewSection = ({
  productId,
  initialReviews,
  initialCursor,
}: {
  productId: number;
  initialReviews: ReviewDetail[];
  initialCursor: number;
}) => {
  const [option, setOption] = useState<string>('recent');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const { trigger } = triggerStore();

  const {
    items: reviews,
    triggerRef,
    reset,
  } = useInfiniteScroll({
    initialData: initialReviews,
    initialCursor,
    fetcher: (cursor) => getProductReviews(productId, option, cursor ?? 0),
  });

  const handleChangeOption = (value: string) => {
    setOption(value);
  };

  useEffect(() => {
    reset();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, trigger]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    reset();

    const topOffset = window.innerWidth >= 1280 ? 128 : window.innerWidth >= 768 ? 96 : 80;
    const y = sectionRef.current!.getBoundingClientRect().top + window.pageYOffset - topOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option]);

  return (
    <section ref={sectionRef}>
      <div className='bg-black-1c1c22 sticky top-17 z-5 flex justify-between py-5 md:top-20 xl:top-24'>
        <h2 className='text-mogazoa-18px-600 xl:text-mogazoa-20px-600'>상품리뷰</h2>
        <SortDropdown variant='review' onChange={handleChangeOption} option={option} />
      </div>
      {reviews?.length > 0 ? (
        <div className='flex flex-col gap-3'>
          {reviews?.map((rev) => (
            <ReviewCard review={rev} productId={productId} key={rev.id} />
          ))}
        </div>
      ) : (
        <div className='my-30 flex flex-col items-center justify-center gap-3 xl:my-40'>
          <NoReview className='w-[50px]' />
          <div className='text-mogazoa-20px-400 text-gray-6e6e82'>첫 리뷰를 작성해 보세요!</div>
        </div>
      )}
      {/* {isPending && (
        <div className='my-30 flex flex-col items-center justify-center gap-3 xl:my-40'>
          <NoReview className='w-[50px]' />
          <div className='text-mogazoa-20px-400 text-gray-6e6e82'>Loading...</div>
        </div>
      )} */}
      <div ref={triggerRef} className='h-20'></div>
    </section>
  );
};

export default ReviewSection;
