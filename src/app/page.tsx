import { getReviewerRanking } from '@/actions/review/reviewer';

import { searchProducts } from '../actions/productList';
import NoResult from './_components/NoResult';
import RatingRank from './_components/RatingRank';
import ResultTitle from './_components/ResultTitle';
import ReviewerRank from './_components/reviewer/ReviewerRank';
import ReviewRank from './_components/ReviewRank';
import SearchResultList from './_components/SearchResultList';
import Sidebar from './_components/Sidebar';

const Home = async ({
  searchParams,
}: {
  searchParams: { q?: string; categoryId?: string; cursor?: string };
}) => {
  const users = await getReviewerRanking();
  const q = searchParams.q ?? '';
  const category = searchParams.categoryId ? Number(searchParams.categoryId) : null;
  const cursor = searchParams.cursor ? Number(searchParams.cursor) : null;

  const data = await searchProducts({ q, category, cursor });
  const items = data.list;

  return (
    <div>
      <div className='flex gap-6'>
        <Sidebar selected={category} q={q} />
        <section className='flex-1 px-[20px] pt-[60px]'>
          <ReviewerRank users={users} className='mb-6 xl:hidden' />
          {q === '' && category === null ? (
            <div className='flex flex-col gap-[80px]'>
              <ReviewRank />
              <RatingRank />
            </div>
          ) : items.length === 0 ? (
            <NoResult />
          ) : (
            <div>
              <ResultTitle category={category} q={q} />
              <SearchResultList
                initialProducts={items}
                initialCursor={data.nextCursor}
                searchParams={{ q, category }}
              />
            </div>
          )}
        </section>
        <ReviewerRank users={users} className='hidden w-0 xl:flex xl:w-[300px] xl:justify-start' />
      </div>
    </div>
  );
};

export default Home;
