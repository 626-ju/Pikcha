'use client';

import { toast } from 'sonner';

import CompareConfirmModal from '@/app/compare/components/CompareConfirmModal';
import CompareOverflowModal from '@/app/compare/components/CompareOverflowModal';
import Button from '@/components/ui/Buttons';
import { MAX_COMPARE_ITEMS } from '@/constants/compareNumber';
import { useCompareStore } from '@/store/compareStore';
import { useModalStore } from '@/store/modalStore';
import { Product } from '@/types/product/productType';

interface AddToCompareButtonProps {
  product: Product;
  className?: string;
}

const AddToCompareButton = ({ product, className }: AddToCompareButtonProps) => {
  const { compareList, addProduct } = useCompareStore();
  const { openModal } = useModalStore();

  const handleAddToCompare = () => {
    const currentCount = compareList.length;

    // 이미 담긴 상품인지 확인
    if (compareList.some((p) => p.id === product.id)) {
      toast.info('이미 저장된 항목입니다. "비교하기"에서 확인해주세요.');
      return;
    }

    if (currentCount === 0) {
      // 첫 번째 담기: 바로 추가 + 안내 토스트
      addProduct(product);
      toast.info('비교대상을 추가해주세요');
    } else if (currentCount >= MAX_COMPARE_ITEMS) {
      // 최대 개수 도달 시: 추가하면서 제거된 항목 안내 모달
      const result = addProduct(product);
      if (result.removedProduct) {
        openModal({
          component: CompareOverflowModal,
          props: {
            removedProduct: result.removedProduct,
            newProduct: product,
          },
        });
      }
    } else {
      // 1개 이상이면서 최대 미만: 추가 + 확인 모달
      addProduct(product);
      openModal({
        component: CompareConfirmModal,
        props: {},
      });
    }
  };

  return (
    <Button variant='secondary' type='button' className={className} onClick={handleAddToCompare}>
      비교하기
    </Button>
  );
};

export default AddToCompareButton;
