import { getTopReviewedProducts, getTopRatingProducts } from '@/actions/productRank';
import { getReviewerRanking } from '@/actions/review/reviewer';
import FloatingButton from '@/components/ui/FloatingButton';

import { searchProducts } from '../actions/productList';
import Hero from './_components/Hero';
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
    <div className='px-5 pb-32 md:px-[30px] xl:px-[120px]'>
      <div className='flex items-start gap-6'>
        <Sidebar selected={category} q={q} />
        <section className='min-w-0 flex-1 px-[20px]'>
          <ReviewerRank
            users={users}
            className='mb-6 pt-[30px] pb-3 md:mb-0 md:pt-[60px] xl:hidden xl:pt-[40px]'
          />
          <MobileCategoryFilter className='mb-3 md:hidden' />
          {q === '' && category === null ? (
            <div className='flex flex-col gap-[80px] xl:pt-1'>
              <Hero />
              <ReviewRank products={topReviewed} />
              <RatingRank products={topRated} />
            </div>
          ) : items.length === 0 ? (
            <NoResult />
          ) : (
            <div>
              <div className='bg-black-1c1c22 top-[70px] z-5 flex items-center justify-between py-6 md:sticky md:top-[80px] xl:top-[100px]'>
                <ResultTitle category={category} q={q} />
              </div>
              <SearchResultList
                initialProducts={items}
                initialCursor={data.nextCursor}
                searchParams={{ q, category }}
              />
            </div>
          )}
        </section>
        <ReviewerRank users={users} className='hidden w-0 xl:flex xl:w-[200px] xl:justify-end' />
      </div>
      <FloatingButton />
    </div>
  );
};

export default Home;
