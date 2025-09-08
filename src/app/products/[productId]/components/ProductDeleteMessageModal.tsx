'use client';

import { useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { deleteProduct } from '@/actions/productDetail';
import Modal from '@/components/common/ModalUi';
import Button from '@/components/ui/Buttons';
import { DialogTitle } from '@/components/ui/dialog';
import { useModalStore } from '@/store/modalStore';
import { useCurrentProductStore } from '@/store/productsStore';

const ProductDeleteMessageModal = () => {
  const closeModal = useModalStore((state) => state.closeModal);
  const clearModal = useModalStore((state) => state.clearModal);
  const [isPending, startTransition] = useTransition();
  const { product } = useCurrentProductStore();
  const router = useRouter();

  const handleClickDelete = () => {
    startTransition(async () => {
      await deleteProduct(product.id);
      clearModal();
      router.push('/');
    });
  };

  const handleClickCancel = () => {
    closeModal();
  };

  return (
    <Modal showCloseButton={false} className='px-7 pb-7'>
      <DialogTitle></DialogTitle>
      <div className='text-mogazoa-18px-600 md:text-mogazoa-24px-600 flex justify-center'>
        {'영화를 정말 삭제하시겠습니까?'}
      </div>
      <div className='flex gap-[10px]'>
        <Button type='button' variant='primary' disabled={isPending} onClick={handleClickDelete}>
          예
        </Button>
        <Button type='button' variant='tertiary' onClick={handleClickCancel}>
          아니오
        </Button>
      </div>
    </Modal>
  );
};

export default ProductDeleteMessageModal;
