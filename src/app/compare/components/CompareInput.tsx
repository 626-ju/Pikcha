'use client';

import Button from '@/components/ui/Buttons';
import { type Product } from '@/types/product/productType';

import CompareInputField from './CompareInputField';

interface CompareInputProps {
  selectedProducts: Product[];
  onProductSelect: (product: Product) => void;
  onProductRemove: (productId: number) => void;
  onCompare: () => void;
}

const CompareInput = ({
  selectedProducts,
  onProductSelect,
  onProductRemove,
  onCompare,
}: CompareInputProps) => {
  return (
    <div className='bg-black-252530 mb-8 rounded-lg p-6'>
      <div className='items-start justify-center gap-10 md:flex'>
        <CompareInputField
          index={0}
          selectedProduct={selectedProducts[0]}
          onProductSelect={onProductSelect}
          onProductRemove={onProductRemove}
        />

        <CompareInputField
          index={1}
          selectedProduct={selectedProducts[1]}
          onProductSelect={onProductSelect}
          onProductRemove={onProductRemove}
        />

        <div className='mt-6 flex justify-center md:mt-0 md:pt-[35px]'>
          <Button
            variant='primary'
            onClick={onCompare}
            disabled={selectedProducts.length !== 2}
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
