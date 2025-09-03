'use client';

import { useState, useEffect } from 'react';

import Button from '@/components/ui/Buttons';
import { useCompareStore } from '@/store/compareStore';
import { type Product } from '@/types/product/productType';

import CompareCard from './components/CompareCard';
import CompareInput from './components/CompareInput';
import NoList from './components/NoList';

const ComparePage = () => {
  const { compareList, removeProduct, clearCompareList } = useCompareStore();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<Product[]>([]);
  const [hasAutoFilled, setHasAutoFilled] = useState(false);

  // 페이지 로드 시 compareList에서 마지막 2개 상품을 자동으로 선택 (한 번만)
  useEffect(() => {
    if (compareList.length >= 2 && selectedProducts.length === 0 && !hasAutoFilled) {
      const lastTwo = compareList.slice(-2);
      setSelectedProducts(lastTwo);
      setHasAutoFilled(true);
    }
  }, [compareList, selectedProducts.length, hasAutoFilled]);

  const handleSelectProduct = (product: Product) => {
    if (isDeleteMode) {
      setSelectedForDelete((prev) => {
        const isAlreadySelected = prev.some((p) => p.id === product.id);
        if (isAlreadySelected) {
          return prev.filter((p) => p.id !== product.id);
        }
        return [...prev, product];
      });
    } else {
      setSelectedProducts((prev) => {
        const isAlreadySelected = prev.some((p) => p.id === product.id);

        if (isAlreadySelected) {
          return prev.filter((p) => p.id !== product.id);
        }

        if (prev.length >= 2) {
          return [prev[1], product];
        }

        return [...prev, product];
      });
    }
  };

  const handleProductRemove = (productId: number) => {
    setSelectedProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  const handleCompare = () => {
    if (selectedProducts.length === 2) {
      // 비교 결과 표시 로직
      console.log('비교 시작:', selectedProducts);
    }
  };

  if (compareList.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='mb-4 text-3xl font-bold'>상품 비교</h1>
          <CompareInput
            selectedProducts={selectedProducts}
            onProductSelect={handleSelectProduct}
            onProductRemove={handleProductRemove}
            onCompare={handleCompare}
          />
          <NoList />
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='mb-4 text-3xl font-bold'>상품 비교</h1>
        <div className='flex w-auto justify-end gap-3'>
          {isDeleteMode ? (
            <>
              <Button
                variant='primary'
                onClick={() => {
                  selectedForDelete.forEach((product) => removeProduct(product.id));
                  setSelectedForDelete([]);
                  setIsDeleteMode(false);
                }}
                disabled={selectedForDelete.length === 0}
                className='text-mogazoa-12px-300 text-white-f1f1f5 !h-[32px] w-auto px-5 py-1 whitespace-nowrap'
              >
                삭제 ({selectedForDelete.length})
              </Button>
              <Button
                variant='tertiary'
                onClick={() => {
                  setIsDeleteMode(false);
                  setSelectedForDelete([]);
                }}
                className='text-mogazoa-12px-300 text-white-f1f1f5 !h-[32px] w-auto px-5 py-1 whitespace-nowrap'
              >
                취소
              </Button>
            </>
          ) : (
            <>
              <Button
                variant='tertiary'
                onClick={() => setIsDeleteMode(true)}
                disabled={compareList.length === 0}
                className='text-mogazoa-12px-300 text-white-f1f1f5 !h-[32px] w-auto px-5 py-1 whitespace-nowrap'
              >
                선택 삭제
              </Button>
              <Button
                variant='tertiary'
                onClick={() => {
                  clearCompareList();
                  setSelectedProducts([]);
                }}
                disabled={compareList.length === 0}
                className='text-mogazoa-12px-300 text-white-f1f1f5 !h-[32px] w-auto px-5 py-1 whitespace-nowrap'
              >
                전체 삭제
              </Button>
            </>
          )}
        </div>
      </div>

      <CompareInput
        selectedProducts={selectedProducts}
        onProductSelect={handleSelectProduct}
        onProductRemove={handleProductRemove}
        onCompare={handleCompare}
      />

      <div className='grid grid-cols-2 gap-6'>
        {compareList.map((product) => (
          <CompareCard
            key={product.id}
            product={product}
            isSelected={
              isDeleteMode
                ? selectedForDelete.some((p) => p.id === product.id)
                : selectedProducts.some((p) => p.id === product.id)
            }
            onSelect={handleSelectProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default ComparePage;
