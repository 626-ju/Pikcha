'use client';

import { useSession } from 'next-auth/react';

import ProductModal from '@/app/_components/ProductPost/ProductModal';
import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';
import { useCurrentProductStore } from '@/store/productsStore';
import { ProductDetail } from '@/types/product/productType';

import AddToCompareButton from './AddToCompareButton';
import ReviewPostModal from './ReviewModal';

const ProductTriggers = ({ product }: { product: ProductDetail }) => {
  const openModal = useModalStore((state) => state.openModal);
  const setProduct = useCurrentProductStore((state) => state.setProduct);
  const { data } = useSession();
  const userId = Number(data?.user.id);

  setProduct(product);

  const handleClickPostReviewModal = () => {
    return openModal({ component: ReviewPostModal, props: { mode: 'create' } });
  };

  const handleClickPatchProductModal = () => {
    return openModal({ component: ProductModal, props: { product: product, mode: 'edit' } });
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
      <AddToCompareButton product={product} className='md:flex-1' />
      {product.writerId === userId && (
        <Button
          variant='tertiary'
          type='button'
          className='md:flex-1'
          onClick={handleClickPatchProductModal}
        >
          편집하기
        </Button>
      )}
    </div>
  );
};

export default ProductTriggers;
