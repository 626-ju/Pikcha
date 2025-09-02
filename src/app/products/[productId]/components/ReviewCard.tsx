import Image from 'next/image';

import ThumbChip from '@/components/ui/chips/ThumbChip';
import { ReviewCardProps } from '@/types/review/review';

import ReviewAvatar from './ReviewAvatar';

async function randomPromise(): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      if (isSuccess) {
        resolve();
      } else {
        reject(new Error(`Error! Rejected after 1000ms`));
      }
    }, 1000);
  });
}

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
  const formattedDate = review.createdAt.split('T')[0];
  const filteredImages = review.reviewImages.filter(
    (ri) => ri.source && isValidUrl(ri.source) && !ri.source.includes('https://example.com/...'),
  );

  return (
    <div className='bg-black-252530 border-black-353542 flex w-full flex-col gap-5 rounded-[8px] border-[1px] p-5 transition-normal duration-300 md:flex-row'>
      <ReviewAvatar user={review.user} rating={review.rating} />
      <div className='flex w-full flex-col gap-5'>
        <div className='text-mogazoa-12px-400'>{review.content}</div>
        {filteredImages.length > 0 && (
          <div className='flex gap-[10px] xl:gap-[20px]'>
            {filteredImages.map((ri) => (
              <div
                key={ri.id}
                className='relative h-15 w-15 overflow-hidden rounded-[12px] md:h-20 md:w-20 xl:h-25 xl:w-25'
              >
                <Image src={ri.source as string} alt='리뷰 이미지' fill className='object-cover' />
              </div>
            ))}
          </div>
        )}
        <div className='flex items-end justify-between'>
          <div className='text-mogazoa-12px-400 text-gray-6e6e82 xl:text-mogazoa-14px-400'>
            {formattedDate}
          </div>
          <ThumbChip
            initialCount={review.likeCount}
            initialState={review.isLiked}
            asyncAction={randomPromise}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
