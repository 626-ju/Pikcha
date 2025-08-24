import React from 'react';

import ReviewIcon from '@/app/assets/icon/Icon-review.svg';
import StarIcon from '@/app/assets/icon/Icon-star.svg';
import StatisticsCard from '@/components/common/StatisticsCard';
import { CategoryChip } from '@/components/ui/Chips';

const Activities = () => {
  //서버액션으로 아래 데이터들 미리 가져와서 rsc페이로드로 보내기 가능?
  const averageRating = 4.1;
  const reviewCount = 125;
  const favoriteCategory = '스릴러';

  return (
    <>
      <h2 className='text-mogazoa-18px-600 mt-15 mb-7.5 xl:mt-0'>활동 내역</h2>
      <div className='flex gap-2.5 xl:gap-5'>
        {/* 
            지금 이 남긴 별점 평균이 시안이랑 다르게 단어가 끊기는데 
            이건 폰트 제대로 반영된 후에도 이러면 아예 ReactNode로 넘겨줘서 <br>하고 함께 넘기겠습니다.
        */}
        <StatisticsCard title='남긴 별점 평균'>
          <div className='flex gap-[5px]'>
            <StarIcon size={20} />
            {averageRating}
          </div>
        </StatisticsCard>

        <StatisticsCard title='남긴 리뷰'>
          <div className='flex gap-[5px]'>
            <ReviewIcon size={20} />
            {reviewCount}
          </div>
        </StatisticsCard>

        <StatisticsCard title='관심 카테고리'>
          <CategoryChip className='inline' id={3} name={favoriteCategory} />
        </StatisticsCard>
      </div>
    </>
  );
};

export default Activities;
