import { UserRanking } from '@/types/user/userRanking';

import ReviewerCard from './ReviewerCard';

type ReviewerListProps = {
  users: UserRanking[];
};

const ReviewerList = ({ users }: ReviewerListProps) => {
  return (
    <div className='flex h-auto w-full flex-col gap-5 xl:h-full xl:w-[250px] xl:gap-[30px] xl:px-[30px] xl:pt-[45px]'>
      <h2 className='text-mogazoa-14px-400 xl:text-mogazoa-16px-400 text-white-f1f1f5 light:text-gray-6e6e82'>
        리뷰어 랭킹
      </h2>
      <ol
        className='scrollbar-hide flex gap-5 overflow-x-auto xl:flex-col xl:gap-[30px] xl:overflow-x-visible'
        aria-label='리뷰어 랭킹 목록'
      >
        {users.map((users, i) => (
          <ReviewerCard
            key={users.id}
            rankIdx={i}
            id={users.id}
            nickname={users.nickname}
            image={users.image}
            followersCount={users.followersCount}
            reviewCount={users.reviewCount}
          />
        ))}
      </ol>
    </div>
  );
};
export default ReviewerList;
