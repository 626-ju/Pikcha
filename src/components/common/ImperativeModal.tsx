'use client';

import { forwardRef, useImperativeHandle, useState } from 'react';

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

  const Component = ModalMap[type];

  return <Component isOpen={isOpen} setIsOpen={setIsOpen} />; //샤드 cn 자체에서 dialog포탈 사용
});

ImperativeModal.displayName = 'ImperativeModal';
