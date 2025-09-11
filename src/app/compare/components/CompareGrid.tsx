import { type ProductDetail } from '@/types/product/productType';

import CompareCard from './CompareCard';

interface CompareGridProps {
  list: ProductDetail[];
  isSelected: (product: ProductDetail) => boolean;
  onSelect: (productId: number) => void;
}

const CompareGrid = ({ list, isSelected, onSelect }: CompareGridProps) => {
  return (
    <div className='grid grid-cols-2 gap-6 py-10 md:grid-cols-4 xl:gap-8 xl:px-16'>
      {list.map((product) => (
        <CompareCard
          key={product.id}
          product={product}
          isSelected={isSelected(product)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default CompareGrid;
