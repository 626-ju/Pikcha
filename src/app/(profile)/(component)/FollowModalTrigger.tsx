'use client';

import { useModalStore } from '@/store/modalStore';

import { FolloweeModal, FollowerModal } from './FolloweeModal';

interface Props {
  followers: number;
  followees: number;
}

const FollowerModalTrigger = ({ followers, followees }: Props) => {
  const push = useModalStore((state) => state.push);

  const handleFollowerClick = () => {
    push(FollowerModal);
  };

  const handleFolloweeClick = () => {
    push(FolloweeModal);
  };

  console.log(followers);
  return (
    <div className='flex items-center'>
      <button
        onClick={handleFollowerClick}
        className='border-r-gray-6e6e82 border-r-[1px] pr-[50px] text-center md:pr-20 xl:pr-[50px]'
      >
        <div className={followerCountText}>{followers}</div>
        <span className={followerTextStyle}>팔로워</span>
      </button>

      <button onClick={handleFolloweeClick} className='pl-[50px] text-center md:pl-20 xl:pl-[50px]'>
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
