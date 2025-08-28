import { getReviewerRanking } from '@/actions/review/reviewer';

import ReviewerList from './_components/reviewer/ReviewerList';

const Home = async () => {
  const users = await getReviewerRanking();
  if (!users?.length) {
    return <p>랭킹 데이터가 없습니다.</p>; // 추후 수정 필요
  }
  return <ReviewerList users={users} />;
};

export default Home;
