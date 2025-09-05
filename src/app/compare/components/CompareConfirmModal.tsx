'use client';

import { useRouter } from 'next/navigation';

import Modal from '@/components/common/ModalUi';
import Button from '@/components/ui/Buttons';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModalStore } from '@/store/modalStore';

const CompareConfirmModal = () => {
  const { closeModal } = useModalStore();
  const router = useRouter();

  const handleConfirm = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = ''; // 모달 수정 뒤 수정예정
    closeModal();
    router.push('/compare');
  };

  const handleCancel = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = ''; // 모달 수정 뒤 수정예정
    closeModal();
  };

  return (
    <Modal variant='compare'>
      <DialogHeader>
        <DialogTitle className='text-mogazoa-24px-400 mb-4'>비교하기</DialogTitle>
      </DialogHeader>
      <div className='text-center'>
        <p className='text-gray-9fa6b2 mb-6'>비교하러 가시겠습니까?</p>
        <div className='flex gap-3'>
          <Button variant='tertiary' onClick={handleCancel} className='flex-1'>
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
