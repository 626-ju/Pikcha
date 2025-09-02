'use client';

import { ErrorBoundary } from 'react-error-boundary';

import Modal from '@/components/common/ModalUi';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

import ProductPostForm from './ProductPostForm';
import ErrorFallback from '../../error';

const ProductPostModal = () => {
  const title = '상품 추가';

  return (
    <Modal className='px-[30px] pb-[30px] md:px-10 md:pb-10'>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ProductPostForm />
      </ErrorBoundary>
    </Modal>
  );
};

export default ProductPostModal;
