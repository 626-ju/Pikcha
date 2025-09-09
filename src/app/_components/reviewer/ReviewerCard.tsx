import Image from 'next/image';
import Link from 'next/link';

import GuestProfile from '@/assets/icon/GuestProfile.svg';
import RankingChip from '@/components/ui/chips/RankingChip';
import { UserRanking } from '@/types/user/userRanking';

const ReviewerCard = ({
  id,
  nickname,
  image,
  followersCount,
  reviewCount,
  rankIdx,
}: UserRanking) => {
  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${Math.floor(count / 1000)}K+`;
    }
    return count.toString();
  };
  return (
    <section className='min-w-[147px] shrink-0'>
      <Link href={`/user/${id}`}>
        <div className='flex gap-2.5'>
          {image ? (
            <Image
              src={image}
              alt='프로필 이미지'
              width={42}
              height={42}
              className='h-9 w-9 rounded-full xl:h-[42px] xl:w-[42px]'
            />
          ) : (
            <GuestProfile
              alt='기본 프로필 이미지'
              className='h-9 w-9 rounded-full xl:h-[42px] xl:w-[42px]'
            />
          )}
          <div className='flex flex-col gap-[5.5px] xl:gap-[9px]'>
            <div className='flex gap-[7px]'>
              <RankingChip idx={rankIdx} />
              <h3
                className='text-mogazoa-14px-400 xl:text-mogazoa-16px-400 text-white-f1f1f5 light:text-gray-6e6e82 max-w-20 truncate xl:max-w-24'
                title={nickname}
              >
                {nickname}
              </h3>
            </div>
            <ul className='text-mogazoa-10px-300 xl:text-mogazoa-12px-300 text-gray-6e6e82 flex gap-2.5 xl:gap-[15px]'>
              <li>팔로워 {formatCount(followersCount ?? 0)}</li>
              <li>리뷰 {formatCount(reviewCount ?? 0)}</li>
            </ul>
          </div>
        </div>
      </Link>
    </section>
  );
};
export default ReviewerCard;
