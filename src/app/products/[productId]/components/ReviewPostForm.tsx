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
import { reviewSchema } from '@/types/review/reviewSchema';

import StarRating from './StarRating';

const ReviewPostForm = ({ productId }: { productId: number }) => {
  const { showBoundary } = useErrorBoundary();
  const closeModal = useModalStore((state) => state.closeModal);
  const { setTrigger } = triggerStore();

  const { register, handleSubmit, control, formState } = useForm<ReviewFormValue>({
    resolver: zodResolver(reviewSchema),
    mode: 'all',
  });

  const { isValid, isSubmitting } = formState;

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
    <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col gap-[10px]'>
      <Controller
        name='rating'
        control={control}
        render={({ field }) => <StarRating value={field.value} onChange={field.onChange} />}
      />
      <Textbox placeholder='리뷰를 작성해 주세요.' {...register('content')} maxLength={500} />
      <div className='w-[295px] md:w-[510px] xl:w-[540px]'>
        <Controller
          name='images'
          control={control}
          render={({ field }) => (
            <FileInput value={field.value ?? []} onChange={field.onChange} maxFiles={3} />
          )}
        />
      </div>
      <Button
        variant='primary'
        type='submit'
        disabled={!isValid || isSubmitting}
        className='mt-[15px]'
      >
        작성하기
      </Button>
    </form>
  );
};

export default ReviewPostForm;
