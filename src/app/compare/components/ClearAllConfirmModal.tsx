'use client';

import Modal from '@/components/common/ModalUi';
import Button from '@/components/ui/Buttons';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModalStore } from '@/store/modalStore';

interface ClearAllConfirmModalProps {
  onConfirm: () => void;
}

const ClearAllConfirmModal = ({ onConfirm }: ClearAllConfirmModalProps) => {
  const closeModal = useModalStore((state) => state.closeModal);

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Modal className='px-7 pb-7'>
      <DialogHeader>
        <DialogTitle>알림</DialogTitle>
      </DialogHeader>
      <div className='mb-4 flex flex-col justify-center gap-1 text-center'>
        <span className='text-mogazoa-14px-400 md:text-mogazoa-20px-400'>정말 삭제하겠습니까?</span>
        <span className='text-mogazoa-12px-400 md:text-mogazoa-14px-400'>
          삭제된 비교목록은 복구가 불가합니다.
        </span>
      </div>
      <div className='flex gap-[10px]'>
        <Button type='button' variant='tertiary' onClick={handleCancel}>
          아니오
        </Button>
        <Button type='button' variant='primary' onClick={handleConfirm}>
          예
        </Button>
      </div>
    </Modal>
  );
};

export default ClearAllConfirmModal;
