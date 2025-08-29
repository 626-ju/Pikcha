'use client';

import { DialogDescription } from '@radix-ui/react-dialog';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '@/app/error';
import Modal from '@/components/common/ModalUi';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

import ProfileUpdateForm from '../ProfileUpdateForm';

const ProfileUpdateModal = () => {
  const title = `프로필 편집`;

  return (
    <Modal className='w-min-[335px] px-10'>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription aria-labelledby={title} />
      </DialogHeader>

      <div>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ProfileUpdateForm />
        </ErrorBoundary>
      </div>
    </Modal>
  );
};

export default ProfileUpdateModal;
