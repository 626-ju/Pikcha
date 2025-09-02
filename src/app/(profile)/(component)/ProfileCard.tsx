import Image from 'next/image';

import { getUserInfo } from '@/actions/profile/getUserInfo';
import { truncated } from '@/lib/utils/truncated';

import FollowSection from './FollowSection';

interface Props {
  userid: number;
  myPage: boolean;
}

const ProfileCard = async ({ userid, myPage }: Props) => {
  const data = await getUserInfo(userid);

  const truncatedDescription = truncated(data.description, 140);
  const truncatedNickname = truncated(data.nickname, 10);

  return (
    // 335->296
    <div className='border-black-353542 bg-black-252530 relative flex w-[296px] flex-col items-center gap-7.5 rounded-[12px] px-5 py-7.5 md:w-[470px] md:px-7.5 xl:h-fit xl:w-[340px] xl:gap-10 xl:px-5 xl:py-10'>
      {/* 오버레이 */}
      <div className='pointer-events-none absolute inset-0 h-full w-full bg-center opacity-20 blur-2xl'>
        <Image src={data.image ?? '/images/default-profile.png'} fill alt='오버레이용 이미지' />
      </div>

      <div className='bg-gray-9fa6b2 relative aspect-square h-30 w-30 overflow-hidden rounded-full xl:h-45 xl:w-45'>
        <Image
          src={data.image ?? '/images/default-profile.png'}
          alt='프로필 이미지'
          fill
          sizes='(max-width: 768px)120px, 180px'
        />
      </div>

      <div className='flex flex-col items-center justify-between gap-2.5 xl:gap-5'>
        <h2 className='text-mogazoa-20px-600 md:text-mogazoa-24px-600 text-white-f1f1f5'>
          {truncatedNickname}
        </h2>
        <p className='text-mogazoa-14px-400 xl:text-mogazoa-16px-400 text-gray-6e6e82 break-words'>
          {truncatedDescription}
        </p>
      </div>
      <FollowSection
        myPage={myPage}
        username={truncatedNickname}
        description={truncatedDescription}
        data={data}
      />
    </div>
  );
};

export default ProfileCard;
