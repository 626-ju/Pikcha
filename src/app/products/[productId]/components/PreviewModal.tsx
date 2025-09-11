'use client';

import Image from 'next/image';

import Modal from '@/components/common/ModalUi';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const PreviewModal = ({ image }: { image: string }) => {
  return (
    <Modal className='px-7 pb-7'>
      <DialogHeader>
        <DialogTitle>Preview</DialogTitle>
      </DialogHeader>
      <DialogDescription>클릭한 리뷰 이미지를 확대해서 보여주는 모달입니다.</DialogDescription>
      <div className='flex h-full w-full justify-center'>
        <Image
          src={image}
          alt='리뷰 이미지'
          width={295}
          height={295}
          className='h-auto w-2/3 object-center'
        />
      </div>
    </Modal>
  );
};

export default PreviewModal;
