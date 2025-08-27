import { getTopRatingProducts } from '@/actions/productLank';

import ProductCard from './ProductCard';
import ProductList from './ProductList';

const RatingRank = async () => {
  const topRated = await getTopRatingProducts();

  // 오류 방어용 -> 추후 수정할 수 있음.
  if (!topRated || topRated.length === 0) {
    return <p>랭킹 데이터가 없습니다.</p>;
  }

  return (
    <section>
      <h1 className='text-mogazoa-24px-600 text-white-f1f1f5'>
        별점이 높은 상품 <span className='text-mogazoa-24px-600 text-gradient'>TOP 6</span>
      </h1>
      <ProductList>
        {topRated.map((p) => (
          <ProductCard
            key={p.id}
            movie={{
              id: p.id,
              name: p.name,
              image: p.image,
              rating: p.rating ?? 0,
              reviewCount: p.reviewCount ?? 0,
              favoriteCount: p.favoriteCount ?? 0,
            }}
          />
        ))}
      </ProductList>
    </section>
  );
};

export default RatingRank;
