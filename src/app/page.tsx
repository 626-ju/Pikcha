import { getTopReviewedProducts, getTopRatingProducts } from '@/actions/productRank';
import { getReviewerRanking } from '@/actions/review/reviewer';
import FloatingButton from '@/components/ui/FloatingButton';

import { searchProducts } from '../actions/productList';
import MobileCategoryFilter from './_components/MobileCategoryFilter';
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
  searchParams: Promise<{ q?: string; categoryId?: string; cursor?: string }>;
}) => {
  const params = await searchParams;
  const q = params.q ?? '';
  const category = params.categoryId ? Number(params.categoryId) : null;
  const cursor = params.cursor ? Number(params.cursor) : null;

  // API 병렬 호출
  const [users, data, topReviewed, topRated] = await Promise.all([
    getReviewerRanking(),
    searchProducts({ q, category, cursor }),
    getTopReviewedProducts(),
    getTopRatingProducts(),
  ]);

  const items = data.list;

  return (
    <div className='pb-32'>
      <div className='flex items-start gap-6'>
        <Sidebar selected={category} q={q} />
        <section className='min-w-0 flex-1 overflow-hidden px-[20px]'>
          <ReviewerRank users={users} className='mb-6 pt-[40px] xl:hidden' />
          {q === '' && category === null ? (
            <div className='flex flex-col'>
              <MobileCategoryFilter className='mb-6 md:hidden' />
              <div className='flex flex-col gap-[80px]'>
                <ReviewRank products={topReviewed} />
                <RatingRank products={topRated} />
              </div>
            </div>
          ) : items.length === 0 ? (
            <NoResult />
          ) : (
            <div>
              <ResultTitle category={category} q={q} />
              <MobileCategoryFilter className='mt-3 md:hidden' />
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
      <FloatingButton />
    </div>
  );
};

export default Home;
