import React from 'react';

import { getUserInfo } from '@/actions/profile/getUserInfo';
import StatisticsCard from '@/app/(profile)/(component)/StatisticsCard';
import ReviewIcon from '@/assets/icon/Icon-review.svg';
import StarIcon from '@/assets/icon/Icon-star.svg';
import CategoryChip from '@/components/ui/chips/CategoryChip';

interface Props {
  userid: number;
}

const Activities = async ({ userid }: Props) => {
  const data = await getUserInfo(userid);

  return (
    <>
      <h2 className='text-mogazoa-18px-600 mt-15 mb-7.5 xl:mt-0'>활동 내역</h2>
      <div className='flex gap-2.5 xl:gap-5'>
        {/* 
            지금 이 남긴 별점 평균이 시안이랑 다르게 단어가 끊기는데 
            이건 폰트 제대로 반영된 후에도 이러면 아예 ReactNode로 넘겨줘서 <br>하고 함께 넘기겠습니다.
        */}
        <StatisticsCard title='남긴 별점 평균'>
          <div className='text-yellow-ffc83c flex gap-[5px]'>
            <StarIcon size={20} />
            <span className='text-white-f1f1f5'>{data.averageRating}</span>
          </div>
        </StatisticsCard>

        <StatisticsCard title='남긴 리뷰'>
          <div className='flex gap-[5px]'>
            <ReviewIcon size={20} />
            {data.reviewCount}
          </div>
        </StatisticsCard>

        <StatisticsCard title='관심 카테고리'>
          <CategoryChip
            className='text-mogazoa-14px-400 px-3 py-2' //시안과 다르게 카테고리 칩 크기 키우기
            category={data.mostFavoriteCategory ?? { id: 1, name: '기타' }}
          />
        </StatisticsCard>
      </div>
    </>
  );
};

export default Activities;
