import ProductCard from '@/components/common/ProductCard';
import { Product } from '@/types/product/productType';

import ProductList from './ProductList';

interface RatingRankProps {
  products: Product[];
}

const RatingRank = ({ products }: RatingRankProps) => {
  // 오류 방어용 -> 추후 수정할 수 있음.
  if (!products || products.length === 0) {
    return <p>랭킹 데이터가 없습니다.</p>;
  }

  return (
    <section>
      <h1 className='text-mogazoa-24px-600 text-white-f1f1f5'>
        별점이 높은 상품 <span className='text-mogazoa-24px-600 text-gradient'>TOP 8</span>
      </h1>
      <ProductList>
        {products.map((p) => (
          <ProductCard key={p.id} movie={p} />
        ))}
      </ProductList>
    </section>
  );
};

export default RatingRank;
