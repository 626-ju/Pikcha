import { zodResolver } from '@hookform/resolvers/zod';
import { useErrorBoundary } from 'react-error-boundary';
import { Controller, useForm } from 'react-hook-form';

import { postReview } from '@/actions/review/review';
import FileInput from '@/components/common/FileInput';
import Textbox from '@/components/common/Textbox';
import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';
import { triggerStore } from '@/store/triggerStore';
import { ReviewFormValue } from '@/types/review/review';
import { postReviewSchema } from '@/types/review/reviewSchema';

import StarRating from './StarRating';

const ReviewPostForm = ({ productId }: { productId: number }) => {
  const { showBoundary } = useErrorBoundary();
  const closeModal = useModalStore((state) => state.closeModal);
  const { setTrigger } = triggerStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { isLoading, errors },
  } = useForm<ReviewFormValue>({
    resolver: zodResolver(postReviewSchema),
    mode: 'onChange',

    defaultValues: { rating: 0 },
  });

  const onSubmit = async (data: ReviewFormValue) => {
    try {
      await postReview({ data, productId });
      setTrigger();
      closeModal();
    } catch (err) {
      showBoundary(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col'>
      <Controller
        name='rating'
        control={control}
        render={({ field }) => (
          <StarRating
            value={field.value}
            onChange={field.onChange}
            className={errors.rating ? 'border-red-ff0000 animate-shake' : ''}
          />
        )}
      />
      <div className='my-[10px]'>
        <Textbox
          placeholder='리뷰를 작성해 주세요.'
          {...register('content')}
          maxLength={500}
          errorMessage={errors.content?.message}
        />
      </div>
      {/* <p className={`text-red-ff0000 text-mogazoa-12px-300 h-3`}>
        {errors && (errors.content?.message ?? errors.rating?.message)}
      </p>  <- 최종 픽스되면 지우기 */}
      <div className='my-scrollbar w-[295px] overflow-x-scroll md:w-[510px] xl:w-[540px]'>
        <Controller
          name='images'
          control={control}
          render={({ field }) => (
            <FileInput value={field.value ?? []} onChange={field.onChange} maxFiles={3} />
          )}
        />
      </div>
      <p className='text-mogazoa-12px-300 md:text-mogazoa-14px-300 text-red-ff0000 mt-4 flex justify-center'>
        {errors && (errors.content?.message ?? errors.rating?.message)}
      </p>
      <Button
        variant='primary'
        type='submit'
        disabled={isLoading}
        className={`mt-5 md:mt-6 ${(errors.content?.message || errors.rating?.message) && 'mt-1 md:mt-1'}`}
      >
        리뷰 추가하기
      </Button>
    </form>
  );
};

export default ReviewPostForm;
