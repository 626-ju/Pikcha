'use client';

import { deleteReview } from '@/actions/review/review';
import Modal from '@/components/common/ModalUi';
import Button from '@/components/ui/Buttons';
import { DialogTitle } from '@/components/ui/dialog';
import { useModalStore } from '@/store/modalStore';
import { useCurrentProductStore } from '@/store/productsStore';
import { triggerStore } from '@/store/triggerStore';

const ReviewDeleteMessageModal = ({ reviewId }: { reviewId: number }) => {
  const closeModal = useModalStore((state) => state.closeModal);
  const { product } = useCurrentProductStore();
  const { setTrigger } = triggerStore();

  const handleClickDelete = async () => {
    await deleteReview(reviewId, product.id);
    closeModal();
    setTrigger();
  };

  const handleClickCancel = () => {
    closeModal();
  };

  return (
    <Modal showCloseButton={false} className='px-7 pb-7'>
      <DialogTitle></DialogTitle>
      <div className='text-mogazoa-18px-600 md:text-mogazoa-24px-600 flex justify-center'>
        {'리뷰를 정말 삭제하시겠습니까?'}
      </div>
      <div className='flex gap-[10px]'>
        <Button type='button' variant='primary' onClick={handleClickDelete}>
          예
        </Button>
        <Button type='button' variant='tertiary' onClick={handleClickCancel}>
          아니오
        </Button>
      </div>
    </Modal>
  );
};

export default ReviewDeleteMessageModal;
