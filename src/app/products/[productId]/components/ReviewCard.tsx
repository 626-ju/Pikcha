'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

import ThumbChip from '@/components/ui/chips/ThumbChip';
import { useModalStore } from '@/store/modalStore';
import { ReviewCardProps } from '@/types/review/review';

import PreviewModal from './PreviewModal';
import ReviewAvatar from './ReviewAvatar';
import ReviewDeleteMessageModal from './ReviewDeleteMessageModal';
import ReviewModal from './ReviewModal';

const isValidUrl = (url: string) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const openModal = useModalStore((state) => state.openModal);
  const { data } = useSession();
  const userId = Number(data?.user.id);

  const formattedDate = review.createdAt.split('T')[0];
  const filteredImages = review.reviewImages.filter(
    (ri) => ri.source && isValidUrl(ri.source) && !ri.source.includes('https://example.com/...'),
  );

  const handleClickPatchModal = () => {
    return openModal({ component: ReviewModal, props: { review, mode: 'edit' } });
  };

  const handleClickDeleteModal = () => {
    return openModal({ component: ReviewDeleteMessageModal, props: { reviewId: review.id } });
  };

  const handleClickPreviewModal = (imageSrc: string) => {
    return openModal({ component: PreviewModal, props: { image: imageSrc } });
  };

  return (
    <div className='bg-black-252530 border-black-353542 flex w-full flex-col gap-5 rounded-[8px] border-[1px] p-5 transition-normal duration-300 md:flex-row'>
      <ReviewAvatar user={review.user} rating={review.rating} />
      <div className='flex w-full flex-col gap-5'>
        <div className='text-mogazoa-14px-400 xl:text-mogazoa-16px-400'>{review.content}</div>
        {filteredImages.length > 0 && (
          <div className='flex gap-[10px] xl:gap-[20px]'>
            {filteredImages.map((ri) => (
              <div
                key={ri.id}
                onClick={() => handleClickPreviewModal(ri.source as string)}
                className='relative h-15 w-15 cursor-pointer overflow-hidden rounded-[12px] md:h-20 md:w-20 xl:h-25 xl:w-25'
              >
                <Image
                  src={(ri.source as string) ?? '/images/noImage.png'}
                  alt='리뷰 이미지'
                  fill
                  className='object-cover'
                />
              </div>
            ))}
          </div>
        )}
        <div className='flex items-end justify-between'>
          <div className='flex items-center gap-[10px]'>
            <div className='text-mogazoa-12px-400 text-gray-6e6e82 xl:text-mogazoa-14px-400'>
              {formattedDate}
            </div>
            {review.userId === userId && (
              <>
                {' '}
                <button
                  type='button'
                  onClick={handleClickPatchModal}
                  className='text-mogazoa-12px-300 xl:text-mogazoa-14px-300 text-gray-9fa6b2 hover:underline'
                >
                  수정
                </button>
                <button
                  type='button'
                  onClick={handleClickDeleteModal}
                  className='text-mogazoa-12px-300 xl:text-mogazoa-14px-300 text-gray-9fa6b2 hover:underline'
                >
                  삭제
                </button>
              </>
            )}
          </div>
          <ThumbChip
            initialCount={review.likeCount}
            initialState={review.isLiked}
            reviewId={review.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
