'use client';

import { useModalStore } from '@/store/modalStore';

import FollowModalContent from './(modal)/FollowModal';

interface Props {
  username: string;
  followers: number;
  followees: number;
}

const FollowerModalTrigger = ({ followers, followees, username }: Props) => {
  const open = useModalStore((state) => state.open);

  const handleFollowerClick = () => {
    open({ component: FollowModalContent, props: { username, type: 'followers' } });
  };

  const handleFolloweeClick = () => {
    open({ component: FollowModalContent, props: { username, type: 'followees' } });
  };

  return (
    <div className='flex items-center'>
      <button
        className='border-r-gray-6e6e82 border-r-[1px] pr-[50px] text-center md:pr-20 xl:pr-[50px]'
        onClick={handleFollowerClick}
      >
        <div className={followerCountText}>{followers}</div>
        <span className={followerTextStyle}>팔로워</span>
      </button>

      <button className='pl-[50px] text-center md:pl-20 xl:pl-[50px]' onClick={handleFolloweeClick}>
        <div className={followerCountText}>{followees}</div>
        <span className={followerTextStyle}>팔로잉</span>
      </button>
    </div>
  );
};

export default FollowerModalTrigger;

const followerTextStyle =
  'text-mogazoa-14px-400 xl:text-mogazoa-16px-400 text-[var(--color-gray-9fa6b2)]';
const followerCountText = 'text-mogazoa-18px-600 xl:text-mogazoa-20px-600';
