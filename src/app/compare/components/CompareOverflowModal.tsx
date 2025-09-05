'use client';

import { useRouter } from 'next/navigation';

import Modal from '@/components/common/ModalUi';
import Button from '@/components/ui/Buttons';
import { DialogTitle } from '@/components/ui/dialog';
import { useCompareStore } from '@/store/compareStore';
import { useModalStore } from '@/store/modalStore';
import { Product } from '@/types/product/productType';

interface CompareOverflowModalProps {
  removedProduct: Product;
  newProduct: Product;
}

const CompareOverflowModal = ({ removedProduct, newProduct }: CompareOverflowModalProps) => {
  const { closeModal } = useModalStore();
  const { undoRemove } = useCompareStore();
  const router = useRouter();

  const handleUndo = () => {
    undoRemove(removedProduct, newProduct);
    closeModal();
    router.push('/compare');
  };

  const handleGoToCompare = () => {
    closeModal();
    router.push('/compare');
  };

  return (
    <Modal variant='compare'>
      <div className='text-center'>
        <DialogTitle className='text-mogazoa-24px-400 mb-4'>비교하기 목록이 가득참</DialogTitle>
        <p className='text-gray-9fa6b2 mb-2'>비교하기는 최대 4개까지 저장 가능합니다.</p>
        <p className='text-gray-9fa6b2 mb-6'>
          <span className='text-red-400'>&ldquo;{removedProduct.name}&rdquo;</span>이(가) 삭제되고{' '}
          <span className='text-green-400'>&ldquo;{newProduct.name}&rdquo;</span>이(가)
          추가되었습니다.
        </p>

        <div className='flex gap-3'>
          <Button variant='tertiary' onClick={handleUndo} className='flex-1'>
            삭제 되돌리기
          </Button>
          <Button variant='primary' onClick={handleGoToCompare} className='flex-1'>
            비교하러 가기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CompareOverflowModal;
