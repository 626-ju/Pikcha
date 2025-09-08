import { zodResolver } from '@hookform/resolvers/zod';
import { useErrorBoundary } from 'react-error-boundary';
import { Controller, useForm } from 'react-hook-form';

import { patchProduct, postProduct } from '@/actions/productDetail';
import CategoryDropdown from '@/components/common/dropdowns/CategoryDropdown';
import FileInput from '@/components/common/FileInput';
import Input from '@/components/common/Input';
import Textbox from '@/components/common/Textbox';
import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';
import { productSchema } from '@/types/product/productSchema';
import { ProductDetail, ProductFormValue } from '@/types/product/productType';

const ProductForm = ({ product, mode }: { product?: ProductDetail; mode: 'create' | 'edit' }) => {
  const { showBoundary } = useErrorBoundary();
  const closeModal = useModalStore((state) => state.closeModal);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting, isDirty },
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
    } catch (err) {
      showBoundary(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[10px]'>
      <div className='flex flex-col gap-[10px] md:flex-row-reverse md:items-center md:gap-[15px]'>
        <Controller
          name='image'
          control={control}
          render={({ field }) => (
            <FileInput value={field.value ?? []} onChange={field.onChange} maxFiles={1} />
          )}
        />
        <div className='flex flex-col gap-[10px] md:flex-1 md:gap-3'>
          <Input
            placeholder='작품 제목'
            {...register('name')}
            errorMessage={errors.name?.message}
          />
          <Controller
            name='categoryId'
            control={control}
            render={({ field }) => (
              <CategoryDropdown currentValue={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>
      <Textbox
        placeholder='작품에 대해 설명해주세요!'
        {...register('description')}
        maxLength={500}
      />
      <Button
        variant='primary'
        className='mt-6'
        disabled={!isValid || isSubmitting || (mode === 'edit' && !isDirty)}
      >
        {mode === 'create' ? '추가하기' : '수정하기'}
      </Button>
    </form>
  );
};

export default ProductForm;
