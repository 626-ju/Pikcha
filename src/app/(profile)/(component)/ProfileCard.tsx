import Image from 'next/image';

import { getUserInfo } from '@/actions/profile/getUserInfo';
import { truncated } from '@/lib/utils/truncated';

import FollowerModalTrigger from './FollowModalTrigger';
import FollowTrigger from './FollowTrigger';
import UpdateTrigger from './UpdateTrigger';

interface Props {
  userid: number;
  myPage?: boolean;
}

const ProfileCard = async ({ userid, myPage }: Props) => {
  const data = await getUserInfo(userid);

  const truncatedDescription = truncated(data.description, 140);

  return (
    <div className='border-black-353542 bg-black-252530 relative flex w-[335px] flex-col items-center gap-7.5 rounded-[12px] px-5 py-7.5 md:w-[509px] md:px-7.5 xl:h-fit xl:w-[340px] xl:gap-10 xl:px-5 xl:py-10'>
      {/* 오버레이 */}
      <div
        className='pointer-events-none absolute inset-0 h-full w-full bg-center opacity-20 blur-2xl'
        style={{ backgroundImage: `url(${data.image})` }}
      />
      {data.image ? (
        <Image
          src={data.image}
          alt='프로필 이미지'
          width={180}
          height={180}
          className='h-30 w-30 rounded-full object-cover xl:h-45 xl:w-45'
        />
      ) : (
        <div className='h-30 w-30 rounded-full bg-amber-500 xl:h-45 xl:w-45' />
      )}

      <div className='flex flex-col items-center justify-between gap-2.5 xl:gap-5'>
        <h2 className='text-mogazoa-20px-600 md:text-mogazoa-24px-600 text-white-f1f1f5'>
          {data.nickname}
        </h2>
        <p className='text-mogazoa-14px-400 xl:text-mogazoa-16px-400 text-gray-6e6e82 break-words'>
          {truncatedDescription}
        </p>
      </div>
      <FollowerModalTrigger
        followers={data.followersCount}
        followees={data.followeesCount}
        username={data.nickname}
      />
      {myPage ? (
        <UpdateTrigger
          nickname={data.nickname}
          description={truncatedDescription}
          image={data.image}
        />
      ) : (
        <FollowTrigger isFollowing={data.isFollowing} />
      )}
    </div>
  );
};

export default ProfileCard;
