'use client';

import { useRouter } from 'next/navigation';

import Modal from '@/components/common/ModalUi';
import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';

const CompareConfirmModal = () => {
  const { closeModal } = useModalStore();
  const router = useRouter();

  const handleConfirm = () => {
    closeModal();
    router.push('/compare');
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Modal variant='compare'>
      <h2>비교하기</h2>
      <p>비교하러 가시겠습니까?</p>
      <div className='flex gap-3'>
        <Button variant='tertiary' onClick={handleCancel} className='flex-1'>
          취소
        </Button>
        <Button variant='primary' onClick={handleConfirm} className='flex-1'>
          비교하러 가기
        </Button>
      </div>
    </Modal>
  );
};

export default CompareConfirmModal;
