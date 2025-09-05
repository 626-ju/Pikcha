import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useErrorBoundary } from 'react-error-boundary';
import { Controller, useForm } from 'react-hook-form';

import { patchReview } from '@/actions/review/review';
import FileInput from '@/components/common/FileInput';
import Textbox from '@/components/common/Textbox';
import Button from '@/components/ui/Buttons';
import { useModalStore } from '@/store/modalStore';
import { triggerStore } from '@/store/triggerStore';
import { ReviewDetail, ReviewFormValue } from '@/types/review/review';
import { patchReviewSchema } from '@/types/review/reviewSchema';

import StarRating from './StarRating';

const ReviewPatchForm = ({ review }: { review: ReviewDetail }) => {
  const { showBoundary } = useErrorBoundary();
  const closeModal = useModalStore((state) => state.closeModal);
  const { setTrigger } = triggerStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, isDirty },
  } = useForm<ReviewFormValue>({
    resolver: zodResolver(patchReviewSchema),
    mode: 'all',
    defaultValues: {
      rating: review.rating,
      content: review.content,
      images: review.reviewImages?.map((re) => re.source) ?? [],
    },
  });

  useEffect(() => {
    console.log(
      'defaultValues.images: ',
      review.reviewImages.map((re) => re.source),
    );
  });

  const onSubmit = async (data: ReviewFormValue) => {
    console.log('images:', data.images);
    const transformedImages =
      data.images?.map(
        (img) => ({ source: img as string }), // 새 이미지 → source만
      ) ?? [];
    try {
      await patchReview({
        rating: data.rating,
        content: data.content,
        images: transformedImages,
        reviewId: review.id,
      });
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
      <div className='my-scrollbar w-[295px] overflow-x-scroll md:w-[510px] xl:w-[540px]'>
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
        disabled={!isValid || isSubmitting || !isDirty}
        className='mt-[15px]'
      >
        작성하기
      </Button>
    </form>
  );
};

export default ReviewPatchForm;
