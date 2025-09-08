import Button from '@/components/ui/Buttons';
import { type Product } from '@/types/product/productType';
import { compareProducts } from '@/utils/compareProducts';

import CompareMovieCards from './CompareMovieCards';
import CompareResultHeader from './CompareResultHeader';
import CompareTable from './CompareTable';

interface CompareResultProps {
  products: [Product, Product];
  onBackToSelection: () => void;
}

const CompareResult = ({ products, onBackToSelection }: CompareResultProps) => {
  const [product1, product2] = products;
  const comparisonResult = compareProducts(product1, product2);

  return (
    <div className='space-y-6'>
      <CompareResultHeader
        winner={comparisonResult.winner}
        winCount={comparisonResult.winCount}
        isDraw={comparisonResult.isDraw}
        products={products}
      />

      <CompareMovieCards products={products} />

      <CompareTable products={products} comparisonResult={comparisonResult} />

      <div className='mt-8 text-center'>
        <Button variant='tertiary' onClick={onBackToSelection}>
          다른 영화 비교하기
        </Button>
      </div>
    </div>
  );
};

export default CompareResult;
