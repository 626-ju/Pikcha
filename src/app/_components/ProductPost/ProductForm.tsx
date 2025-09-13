'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { patchProduct, postProduct } from '@/actions/productDetail';
import ProductDeleteMessageModal from '@/app/products/[productId]/components/ProductDeleteMessageModal';
import CategoryDropdown from '@/components/common/dropdowns/CategoryDropdown';
import FileInput from '@/components/common/FileInput';
import Input from '@/components/common/Input';
import Textbox from '@/components/common/Textbox';
import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';
import { productSchema } from '@/types/product/productSchema';
import { ProductDetail, ProductFormValue } from '@/types/product/productType';

const ProductForm = ({ product, mode }: { product: ProductDetail; mode: 'create' | 'edit' }) => {
  const [isError, setIsError] = useState(false);
  const closeModal = useModalStore((state) => state.closeModal);
  const openModal = useModalStore((state) => state.openModal);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isLoading, isDirty },
  } = useForm<ProductFormValue>({
    resolver: zodResolver(productSchema),
    mode: 'all',
    defaultValues:
      mode === 'edit'
        ? {
            name: product?.name,
            image: product?.image ? [product.image] : [],
            categoryId: product?.categoryId,
            description: product?.description,
          }
        : {
            name: '',
            image: [],
            categoryId: undefined,
            description: '',
          },
  });

  const onSubmit = async (data: ProductFormValue) => {
    try {
      if (mode === 'create') {
        await postProduct(data);
      } else {
        if (!product) throw new Error('수정할 상품 정보가 없습니다.');
        await patchProduct({ productId: product.id, data });
      }
      closeModal();
    } catch {
      setIsError(true);
    }
  };

  const handleClickDelete = async () => {
    openModal({ component: ProductDeleteMessageModal });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <div className='flex flex-col gap-[10px] md:flex-row-reverse md:items-center md:gap-[15px]'>
        <Controller
          name='image'
          control={control}
          render={({ field }) => (
            <FileInput
              value={field.value ?? []}
              onChange={field.onChange}
              maxFiles={1}
              hasError={errors.image?.message}
            />
          )}
        />
        <div className='flex flex-col gap-[10px] md:flex-1 md:gap-4'>
          <Input
            placeholder='작품 제목'
            {...register('name')}
            errorMessage={errors.name?.message ? ' ' : ''}
            setError={setIsError}
          />
          <Controller
            name='categoryId'
            control={control}
            render={({ field }) => (
              <CategoryDropdown
                currentValue={field.value}
                onChange={field.onChange}
                hasError={errors.categoryId?.message}
              />
            )}
          />
        </div>
      </div>
      <div className='my-[10px]'>
        <Textbox
          placeholder='작품에 대해 설명해주세요!'
          {...register('description')}
          maxLength={300}
          errorMessage={errors.description?.message}
        />
      </div>
      <p className='text-mogazoa-12px-300 md:text-mogazoa-14px-300 text-red-ff0000 mt-4 flex justify-center'>
        {(errors &&
          (errors.name?.message ??
            errors.categoryId?.message ??
            errors.description?.message ??
            errors.image?.message)) ||
          (isError && '존재하는 영화 제목입니다.')}
      </p>
      <Button
        variant='primary'
        className={`mt-5 md:mt-6 ${(errors.categoryId?.message || errors.description?.message || errors.image?.message || errors.name?.message || isError) && 'mt-1 md:mt-1'}`}
        disabled={isLoading || isError || (mode === 'edit' && !isDirty)}
      >
        {mode === 'create' ? '추가하기' : '수정하기'}
      </Button>

      {mode === 'edit' && (
        <Button
          variant='tertiary'
          className='border-red-ff0000/80 text-red-ff0000/80 mt-[10px]'
          onClick={handleClickDelete}
        >
          삭제하기
        </Button>
      )}
    </form>
  );
};

export default ProductForm;
