'use client';

import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import CompareConfirmModal from '@/app/compare/components/CompareConfirmModal';
import CompareOverflowModal from '@/app/compare/components/CompareOverflowModal';
import Button from '@/components/ui/Buttons';
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

  const session = useSession();

  const handleAddToCompare = () => {
    const currentCount = compareList.length;
    const result = addProduct(product.id);

    // 로그아웃 상태면 로그인 유도 토스트
    if (!session.data) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    // 이미 담긴 상품인지 확인
    if (result.isDuplicate) {
      toast.info('이미 저장된 항목입니다. "비교하기"에서 확인해주세요.');
      return;
    }

    if (result.shouldShowModal) {
      // 최대 개수 도달: 오버플로우 모달 표시
      openModal({
        component: CompareOverflowModal,
        props: {
          newProduct: product,
        },
      });
    } else {
      // 성공적으로 추가됨
      if (currentCount === 0) {
        toast.info('첫 영화가 담겼습니다. 비교할 다른 영화를 추가해주세요');
      } else {
        // 1개 이상: 확인 모달
        openModal({
          component: CompareConfirmModal,
        });
      }
    }
  };

  return (
    <Button variant='secondary' type='button' className={className} onClick={handleAddToCompare}>
      비교하기
    </Button>
  );
};

export default AddToCompareButton;
