import { type Product } from '@/types/product/productType';

import CompareCard from './CompareCard';

type Props = {
  list: Product[];
  isSelected: (product: Product) => boolean;
  onSelect: (product: Product) => void;
};

const CompareGrid = ({ list, isSelected, onSelect }: Props) => {
  return (
    <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
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
