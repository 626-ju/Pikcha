'use client';

import { ErrorBoundary } from 'react-error-boundary';

import Modal from '@/components/common/ModalUi';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCurrentProductStore } from '@/store/productsStore';

import ProductForm from './ProductForm';
import ErrorFallback from '../../error';

const ProductModal = ({ mode }: { mode: 'create' | 'edit' }) => {
  const { product } = useCurrentProductStore();
  const title = mode === 'create' ? '작품 추가' : '작품 수정';

  return (
    <Modal className='px-10 pb-[30px] md:px-10 md:pb-10'>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ProductForm mode={mode} product={product} />
      </ErrorBoundary>
    </Modal>
  );
};

export default ProductModal;
