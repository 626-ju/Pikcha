'use client';

import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '@/app/error';
import Modal from '@/components/common/ModalUi';
import CategoryChip from '@/components/ui/chips/CategoryChip';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCurrentProductStore } from '@/store/productsStore';
import { ReviewDetail } from '@/types/review/review';

import ReviewPatchForm from './ReviewpatchForm';
import ReviewPostForm from './ReviewPostForm';

const ReviewPostModal = ({ review, mode }: { review?: ReviewDetail; mode: 'create' | 'edit' }) => {
  const productId = useCurrentProductStore((state) => state.product?.id);
  const title = useCurrentProductStore((state) => state.product?.name);
  const category = useCurrentProductStore((state) => state.product?.category);

  return (
    <Modal className='px-10 pb-7 md:pb-10'>
      <DialogHeader className='flex flex-col items-start gap-[10px]'>
        <CategoryChip category={category} />
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {mode === 'edit' && review ? (
          <ReviewPatchForm review={review} />
        ) : (
          <ReviewPostForm productId={productId} />
        )}
      </ErrorBoundary>
    </Modal>
  );
};

export default ReviewPostModal;
