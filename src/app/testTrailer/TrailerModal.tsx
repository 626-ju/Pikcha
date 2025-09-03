'use client';

import { ErrorBoundary } from 'react-error-boundary';

import Modal from '@/components/common/ModalUi';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import ErrorFallback from '../error';
import TrailerContents from './TrailerContents';

interface Props {
  title: string;
}

const TrailerModal = ({ title }: Props) => {
  return (
    <Modal className='w-fit px-10 md:w-fit xl:w-fit'>
      <DialogHeader>
        <DialogTitle>{title} 예고편</DialogTitle>
        <DialogDescription aria-labelledby={`${title} 예고편`} />
      </DialogHeader>

      <div className='flex aspect-video min-w-[296px] items-center justify-center md:min-w-160 xl:min-w-260'>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <TrailerContents title={title} />
        </ErrorBoundary>
      </div>
    </Modal>
  );
};

export default TrailerModal;
