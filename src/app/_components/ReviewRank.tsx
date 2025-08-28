import { getTopReviewedProducts } from '@/actions/productRank';
import ProductCard from '@/components/common/ProductCard';

import ProductList from './ProductList';

const ReviewRank = async () => {
  const topReviewed = await getTopReviewedProducts();

  // 오류 방어용 -> 추후 수정할 수 있음.
  if (!topReviewed || topReviewed.length === 0) {
    return <p>랭킹 데이터가 없습니다.</p>;
  }

  return (
    <section>
      <h1 className='text-mogazoa-24px-600 text-white-f1f1f5 pt-[60px]'>
        지금 핫한 상품 <span className='text-mogazoa-24px-600 text-gradient'>TOP 6</span>
      </h1>
      <ProductList>
        {topReviewed.map((p) => (
          <ProductCard key={p.id} movie={p} />
        ))}
      </ProductList>
    </section>
  );
};

export default ReviewRank;
