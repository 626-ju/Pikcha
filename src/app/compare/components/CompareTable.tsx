import { type ComparisonResult } from '@/types/compare/compareType';
import { type Product } from '@/types/product/productType';

import CompareReviewRow from './CompareReviewRow';
import CompareTableRow from './CompareTableRow';

interface CompareTableProps {
  products: [Product, Product];
  comparisonResult: ComparisonResult;
}

const CompareTable = ({ products, comparisonResult }: CompareTableProps) => {
  const [product1, product2] = products;

  return (
    <div className='bg-black-252530 overflow-hidden rounded-lg'>
      <table className='w-full table-fixed'>
        <thead>
          <tr className='border-black-353542 border-b'>
            <th className='text-mogazoa-16px-400 text-gray-9fa6b2 w-1/4 px-[40px] py-5 text-center'>
              기준
            </th>
            <th className='text-mogazoa-16px-400 text-gray-9fa6b2 w-1/4 px-[40px] py-5 text-center'>
              {product1.name}
            </th>
            <th className='text-mogazoa-16px-400 text-gray-9fa6b2 w-1/4 px-[40px] py-5 text-center'>
              {product2.name}
            </th>
            <th className='text-mogazoa-16px-400 text-gray-9fa6b2 w-1/4 px-[40px] py-5 text-center'>
              결과
            </th>
          </tr>
        </thead>
        <tbody>
          <CompareTableRow
            label='별점'
            value1={comparisonResult.details.rating.value1}
            value2={comparisonResult.details.rating.value2}
            winner={comparisonResult.details.rating.winner}
            products={products}
          />
          <CompareTableRow
            label='찜 개수'
            value1={comparisonResult.details.favoriteCount.value1}
            value2={comparisonResult.details.favoriteCount.value2}
            winner={comparisonResult.details.favoriteCount.winner}
            products={products}
          />
          <CompareTableRow
            label='리뷰 개수'
            value1={comparisonResult.details.reviewCount.value1}
            value2={comparisonResult.details.reviewCount.value2}
            winner={comparisonResult.details.reviewCount.winner}
            products={products}
          />
          <CompareReviewRow products={products} />
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
