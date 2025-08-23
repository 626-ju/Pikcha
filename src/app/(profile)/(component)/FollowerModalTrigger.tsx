'use client';

import { useModalStore } from '@/store/modalStore';

import { FollowerModal } from './FollowerModal';

const FollowerModalTrigger = () => {
  const push = useModalStore((state) => state.push);
  ///{teamId}/users/me 서버액션으로 유저 팔로우, 팔로잉 수 가져와서 채우기(리퀘스트 메모이제이션 되어야 함)

  const follwees = 112;
  const follwers = 115;

  const handleFollowerClick = () => {
    push(FollowerModal);
  };

  const handleFolloweeClick = () => {
    // push(FolloweeModal);
  };

  return (
    <div className='flex items-center'>
      <button
        onClick={handleFollowerClick}
        className='border-r-[1px] border-r-[var(--color-gray-6e6e82)] pr-[50px] text-center md:pr-20 xl:pr-[50px]'
      >
        <div className={followerCountText}>{follwers}</div>
        <span className={followerTextStyle}>팔로워</span>
      </button>

      <button onClick={handleFolloweeClick} className='pl-[50px] text-center md:pl-20 xl:pl-[50px]'>
        <div className={followerCountText}>{follwees}</div>
        <span className={followerTextStyle}>팔로잉</span>
      </button>
    </div>
  );
};

export default FollowerModalTrigger;

const followerTextStyle =
  'text-mogazoa-14px-400 xl:text-mogazoa-16px-400 text-[var(--color-gray-9fa6b2)]';
const followerCountText = 'text-mogazoa-18px-600 xl:text-mogazoa-20px-600';
