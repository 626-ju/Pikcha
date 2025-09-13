'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Modal from '@/components/common/ModalUi';
import Button from '@/components/ui/Buttons';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MAX_COMPARE_ITEMS } from '@/constants/compareNumber';
import { useCompareProducts } from '@/hooks/useCompareProducts';
import { useCompareStore } from '@/store/compareStore';
import { useModalStore } from '@/store/modalStore';
import { type ProductDetail } from '@/types/product/productType';

import SelectableMovieCard from './SelectableMovieCard';

interface CompareOverflowModalProps {
  newProduct: ProductDetail;
}

const CompareOverflowModal = ({ newProduct }: CompareOverflowModalProps) => {
  const { closeModal } = useModalStore();
  const { compareList, addProductWithRemoval, setShouldAutoSelect } = useCompareStore();
  const { products: compareProducts, loading } = useCompareProducts(compareList);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);

  const [showSpinner, setShowSpinner] = useState(true);

  // 최소 300ms 로딩 스피너 표시 (깜빡임 방지)
  useEffect(() => {
    if (!loading && compareProducts.length > 0) {
      const timer = setTimeout(() => {
        setShowSpinner(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowSpinner(true);
    }
  }, [loading, compareProducts.length]);

  const router = useRouter();

  const handleSelectProduct = (product: ProductDetail) => {
    setSelectedProduct((prev) => (prev?.id === product.id ? null : product));
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      addProductWithRemoval(newProduct.id, selectedProduct.id);
      setShouldAutoSelect(true);
      closeModal();
      router.push('/compare');
    }
  };

  return (
    <Modal variant='compare'>
      <DialogHeader>
        <DialogTitle className='text-mogazoa-24px-400'>비교하기 목록 가득참</DialogTitle>
      </DialogHeader>
      <div className='text-center'>
        <p className='text-gray-9fa6b2 text-mogazoa-16px-300'>
          비교하기는 최대 {MAX_COMPARE_ITEMS}개까지 저장 가능합니다.
        </p>
        <p className='text-gray-9fa6b2 text-mogazoa-16px-300 mb-6 break-words break-keep whitespace-normal'>
          <span className='text-main-blue'>&ldquo;{newProduct.name}&rdquo;</span>을(를) 추가하려면
          기존 영화 중 하나를 삭제해주세요.
        </p>

        <div className='mb-10 h-110'>
          {showSpinner ? (
            <div className='flex h-full items-center justify-center'>
              <div className='relative h-16 w-16'>
                <div className='absolute inset-0 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500'></div>
                <div className='absolute inset-0 animate-spin rounded-full border-4 border-gray-200 border-t-purple-500 delay-150'></div>
              </div>
            </div>
          ) : (
            <div className='grid h-full max-h-110 grid-cols-2 justify-items-center gap-4 overflow-y-auto px-8'>
              {compareProducts.map((product) => (
                <SelectableMovieCard
                  key={product.id}
                  product={product}
                  isSelected={selectedProduct?.id === product.id}
                  onSelect={handleSelectProduct}
                />
              ))}
            </div>
          )}
        </div>

        <div className='flex gap-3'>
          <Button variant='tertiary' onClick={closeModal} className='flex-1'>
            취소
          </Button>
          <Button
            variant='primary'
            onClick={handleConfirmDelete}
            disabled={!selectedProduct}
            className='flex-1'
          >
            선택한 영화 삭제하고 추가
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CompareOverflowModal;
