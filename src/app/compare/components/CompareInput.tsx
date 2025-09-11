'use client';

import Button from '@/components/ui/Buttons';
import { type ProductDetail } from '@/types/product/productType';

import CompareInputField from './CompareInputField';

interface CompareInputProps {
  selectedProducts: (ProductDetail | null)[];
  onProductSelect: (product: ProductDetail, index: number) => void;
  onProductRemove: (index: number) => void;
  onCompare: () => void;
  isCompareEnabled?: boolean;
}

const CompareInput = ({
  selectedProducts,
  onProductSelect,
  onProductRemove,
  onCompare,
  isCompareEnabled,
}: CompareInputProps) => {
  const validProductsCount = selectedProducts.filter((p) => p !== null).length;
  const compareEnabled = isCompareEnabled ?? validProductsCount === 2;
  return (
    <div className='mb-3'>
      <div className='flex flex-col items-center justify-center gap-6 md:flex-row md:items-start md:gap-10'>
        {selectedProducts.map((product, index) => (
          <CompareInputField
            key={index}
            index={index}
            selectedProduct={product}
            onProductSelect={onProductSelect}
            onProductRemove={onProductRemove}
          />
        ))}

        <div className='mt-2 flex justify-center md:mt-0 md:pt-[35px]'>
          <Button
            variant='primary'
            onClick={onCompare}
            disabled={!compareEnabled}
            className='text-mogazoa-18px-600 h-[50px] w-[200px] px-6 py-3 md:h-[50px] md:w-[165px] xl:h-[65px] xl:w-[200px]'
          >
            비교하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompareInput;
