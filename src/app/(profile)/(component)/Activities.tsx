import React from 'react';

import ReviewIcon from '@/app/assets/icon/Icon-review.svg';
import StarIcon from '@/app/assets/icon/Icon-star.svg';
import { CategoryChip } from '@/components/ui/Chips';

const Activities = () => {
  //서버액션으로 아래 데이터들 미리 가져와서 rsc페이로드로 보내기 가능?
  const averageRating = 4.1;
  const reviewCount = 125;
  const favoriteCategory = '스릴러';

  return (
    <>
      <h2 className='text-mogazoa-18px-600 mb-7.5'>활동 내역</h2>
      <div className='flex gap-2.5 xl:gap-5'>
        <div className={activityCardStyle}>
          <h3 className={cardTitleStyle}>
            남긴 <br className='md:hidden' />
            별점 평균
          </h3>

          <div className='flex gap-[5px]'>
            <StarIcon size={20} />
            {averageRating}
          </div>
        </div>
        <div className={activityCardStyle}>
          <h3 className={cardTitleStyle}>남긴 리뷰</h3>

          <div className='flex gap-[5px]'>
            <ReviewIcon size={20} />
            {reviewCount}
          </div>
        </div>

        <div className={activityCardStyle}>
          <h3 className={cardTitleStyle}>관심 카테고리</h3>

          <CategoryChip className='inline' id={3} name={favoriteCategory} />
        </div>
      </div>
    </>
  );
};

export default Activities;

const activityCardStyle = `w-[105px] md:w-[163px] xl:w-[300px] h-[119px] xl:h-[128px] flex flex-col gap-[15px] xl:gap-5
   bg-[var(--color-black-252530)] border-[var(--color-black-353542)] rounded-[12px] justify-center items-center py-5 px-5`;
const cardTitleStyle =
  'text-[var(--color-gray-9fa6b2)] text-mogazoa-14px-500 xl:text-mogazoa-16px-500 break-keep text-center';
