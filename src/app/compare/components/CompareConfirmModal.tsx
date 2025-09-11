'use client';

import { useRouter } from 'next/navigation';

import Modal from '@/components/common/ModalUi';
import Button from '@/components/ui/Buttons';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCompareStore } from '@/store/compareStore';
import { useModalStore } from '@/store/modalStore';

const CompareConfirmModal = () => {
  const { closeModal } = useModalStore();
  const router = useRouter();
  const { setShouldAutoSelect } = useCompareStore();

  const handleConfirm = () => {
    setShouldAutoSelect(true);
    closeModal();
    router.push('/compare');
  };

  return (
    <Modal variant='compare'>
      <DialogHeader>
        <DialogTitle className='text-mogazoa-24px-400'>비교하기</DialogTitle>
      </DialogHeader>
      <div className='text-center'>
        <p className='text-gray-9fa6b2 text-mogazoa-18px-400 mb-10'>비교하러 가시겠습니까?</p>
        <div className='flex gap-3'>
          <Button variant='tertiary' onClick={closeModal} className='flex-1'>
            취소
          </Button>
          <Button variant='primary' onClick={handleConfirm} className='flex-1'>
            비교하러 가기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CompareConfirmModal;
