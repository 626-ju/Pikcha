import { zodResolver } from '@hookform/resolvers/zod';
import { useErrorBoundary } from 'react-error-boundary';
import { Controller, useForm } from 'react-hook-form';

import { postProduct } from '@/actions/productDetail';
import CategoryDropdown from '@/components/common/dropdowns/CategoryDropdown';
import FileInput from '@/components/common/FileInput';
import Input from '@/components/common/Input';
import Textbox from '@/components/common/Textbox';
import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';
import { productSchema } from '@/types/product/productSchema';
import { ProductFormValue } from '@/types/product/productType';

const ProductPostForm = () => {
  const { showBoundary } = useErrorBoundary();
  const close = useModalStore((state) => state.closeModal);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValue>({
    resolver: zodResolver(productSchema),
    mode: 'all',
  });

  const onSubmit = async (data: ProductFormValue) => {
    try {
      await postProduct(data);
      close();
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
        <div className='flex flex-col md:flex-1 md:gap-[6px]'>
          <Input
            placeholder='작품 제목'
            {...register('name')}
            errorMessage={errors.name?.message}
          />
          <Controller
            name='categoryId'
            control={control}
            render={({ field }) => <CategoryDropdown onChange={field.onChange} />}
          />
        </div>
      </div>
      <Textbox
        placeholder='작품에 대해 설명해주세요!'
        {...register('description')}
        maxLength={500}
        className='w-full'
      />
      <Button variant='primary' className='mt-6'>
        추가하기
      </Button>
    </form>
  );
};

export default ProductPostForm;
