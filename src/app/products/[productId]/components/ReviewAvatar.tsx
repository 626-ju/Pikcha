import Image from 'next/image';
import Link from 'next/link';

import RatingIcon from '@/assets/icon/Icon-star.svg';
import { Avatar } from '@/components/ui/avatar';
import { userType } from '@/types/review/review';

const ReviewAvatar = ({ user, rating }: { user: userType; rating: number }) => {
  const maxRating = 5;

  return (
    <Link href={`/user/${user.id}`} className='flex w-60 gap-[10px]'>
      <Avatar className='bg-gray-9fa6b2 relative h-9 w-9 transition-normal duration-300 xl:h-11 xl:w-11'>
        <Image
          src={user.image ?? '/images/default-profile.png'}
          alt={`profile image for ${user.nickname}`}
          width={36}
          height={36}
          className='h-auto w-full object-cover'
        />
      </Avatar>
      <div className='flex shrink-0 flex-col gap-0.5'>
        {user.nickname.slice(0, 10)}
        <div className='flex gap-[2px]'>
          {Array(maxRating)
            .fill(0)
            .map((_, index) => {
              const isFilled = index < rating;
              return (
                <span key={index}>
                  {isFilled ? (
                    <RatingIcon className='text-yellow-ffc83c h-3 w-3 xl:h-[18px] xl:w-[18px]' />
                  ) : (
                    <RatingIcon className='text-gray-6e6e82 h-3 w-3 xl:h-[18px] xl:w-[18px]' />
                  )}
                </span>
              );
            })}
        </div>
      </div>
    </Link>
  );
};

export default ReviewAvatar;
