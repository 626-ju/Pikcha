import { UserRanking } from '@/types/user/userRanking';

import ReviewerList from './ReviewerList';

interface ReviewerRankProps {
  users: UserRanking[] | null;
  className: string;
}

const ReviewerRank = ({ users, className }: ReviewerRankProps) => {
  return (
    <section className={className}>
      {!users?.length ? (
        <p>랭킹 데이터가 없습니다.</p> // 추후 수정 필요
      ) : (
        <ReviewerList users={users} />
      )}
    </section>
  );
};
export default ReviewerRank;
