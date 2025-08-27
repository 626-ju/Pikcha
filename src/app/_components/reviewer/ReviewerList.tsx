import { UserRanking } from '@/types/user/userRanking';

import ReviewerCard from './ReviewerCard';

type ReviewerListProps = {
  users: UserRanking[];
};

const ReviewerList = ({ users }: ReviewerListProps) => {
  return (
    <div className='flex w-[250px] flex-col gap-[30px] px-[30px] pt-[45px]'>
      <h2 className='text-mogazoa-16px-400 text-white-f1f1f5'>리뷰어 랭킹</h2>
      <ol className='flex flex-col gap-[30px]' aria-label='리뷰어 랭킹 목록'>
        {users.map((users, i) => (
          <ReviewerCard
            key={users.id}
            rankIdx={i}
            id={users.id}
            nickname={users.nickname}
            image={users.image}
            // followersCount={999}
            followersCount={users.followersCount}
            reviewCount={users.reviewCount}
          />
        ))}
      </ol>
    </div>
  );
};
export default ReviewerList;
