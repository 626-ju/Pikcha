'use client';

import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';
import { ProductDetail } from '@/types/product/productType';

import ReviewPostModal from './ReviewPostModal';

const ProductTriggers = ({ product }: { product: ProductDetail }) => {
  const openModal = useModalStore((state) => state.openModal);

  const handleClickPostReviewModal = () => {
    return openModal({ component: ReviewPostModal, props: product });
  };

  return (
    <div className='flex w-full flex-col gap-[15px] md:flex-row'>
      <Button
        variant='primary'
        type='button'
        className='md:flex-2'
        onClick={handleClickPostReviewModal}
      >
        리뷰 작성하기
      </Button>
      <Button variant='secondary' type='button' className='md:flex-1'>
        비교하기
      </Button>
      {product.writerId === 1 && (
        <Button variant='tertiary' type='button' className='md:flex-1'>
          편집하기
        </Button>
      )}
    </div>
  );
};

export default ProductTriggers;
