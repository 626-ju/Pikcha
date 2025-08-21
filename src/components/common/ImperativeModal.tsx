import { forwardRef, useImperativeHandle, useState } from 'react';

import { createPortal } from 'react-dom';

import { FollowerModal } from '@/app/(profile)/user/(component)/FollowerModal';

export interface ImperativeModalHandles {
  open: () => void;
  close: () => void;
}

interface ModalProps {
  type: 'follower';
}

const ModalMap = {
  follower: FollowerModal,
  //  addReview: AddReviewModal, 이런 식으로 추가
};

export const ImperativeModal = forwardRef<ImperativeModalHandles, ModalProps>(({ type }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  const Compoent = ModalMap[type];

  return isOpen
    ? createPortal(<Compoent isOpen={isOpen} setIsOpen={setIsOpen} />, document.body)
    : null;
});

ImperativeModal.displayName = 'ImperativeModal';
