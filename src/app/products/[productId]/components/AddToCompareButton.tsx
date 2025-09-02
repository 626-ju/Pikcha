'use client';

import { toast } from 'sonner';

import CompareConfirmModal from '@/app/compare/components/CompareConfirmModal';
import Button from '@/components/ui/Buttons';
import { useCompareStore } from '@/store/compareStore';
import { useModalStore } from '@/store/modalStore';
import { Product } from '@/types/product/productType';

interface AddToCompareButtonProps {
  product: Product;
  className?: string;
}

const AddToCompareButton = ({ product, className }: AddToCompareButtonProps) => {
  const { compareList, addProduct, undoRemove } = useCompareStore();
  const { openModal } = useModalStore();

  const handleAddToCompare = () => {
    const currentCount = compareList.length;

    // 이미 담긴 상품인지 확인
    if (compareList.some((p) => p.id === product.id)) {
      toast.info('이미 저장된 항목입니다. "비교하기"에서 확인해주세요.');
      return;
    }

    if (currentCount === 0) {
      addProduct(product);
      toast.info('비교대상을 추가해주세요');
      return;
    }

    if (currentCount >= 4) {
      const result = addProduct(product);
      if (result.removedProduct) {
        toast.warning(
          `비교하기는 최대 4개까지 저장. "${result.removedProduct.name}"이(가) 삭제되었습니다.`,
          {
            action: {
              label: 'Undo',
              onClick: () => undoRemove(result.removedProduct!, product),
            },
            actionButtonStyle: {
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: '500',
            },
          },
        );
      }
      return;
    }

    addProduct(product);

    if (currentCount >= 1) {
      // 2개 이상일 때 확인 모달
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
