'use client';

import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '@/app/error';
import Modal from '@/components/common/ModalUi';
import CategoryChip from '@/components/ui/chips/CategoryChip';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProductDetail } from '@/types/product/productType';

import ReviewPostForm from './ReviewPostForm';

const ReviewPostModal = (product: ProductDetail /* 다 받을 필요가 있나? */) => {
  const productId = product.id;
  const title = product.name;

  return (
    <Modal className='px-7 pb-7'>
      <DialogHeader className='flex flex-col items-start gap-[10px]'>
        <CategoryChip category={product.category} />
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ReviewPostForm productId={productId} />
      </ErrorBoundary>
    </Modal>
  );
};

export default ReviewPostModal;
