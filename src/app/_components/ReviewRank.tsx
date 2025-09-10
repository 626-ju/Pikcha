import ProductCard from '@/components/common/ProductCard';
import { Product } from '@/types/product/productType';

import ProductList from './ProductList';

interface ReviewRankProps {
  products: Product[];
}

const ReviewRank = ({ products }: ReviewRankProps) => {
  // 오류 방어용 -> 추후 수정할 수 있음.
  if (!products || products.length === 0) {
    return <p>랭킹 데이터가 없습니다.</p>;
  }

  return (
    <section>
      <h1 className='text-mogazoa-24px-600 text-white-f1f1f5 pt-2 md:pt-[20px] xl:pt-[60px]'>
        지금 핫한 영화 <span className='text-mogazoa-24px-600 text-gradient'>TOP 8</span>
      </h1>
      <ProductList>
        {products.map((p) => (
          <ProductCard key={p.id} movie={p} />
        ))}
      </ProductList>
    </section>
  );
};

export default ReviewRank;
