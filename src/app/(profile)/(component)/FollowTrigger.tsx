'use client';

import React from 'react';

import { deleteFollow, postFollow } from '@/actions/profile/handleFollow';
import Button from '@/components/ui/Buttons';

interface Props {
  isFollowing: boolean;
  userId: number;
}

const FollowTrigger = ({ isFollowing, userId }: Props) => {
  const handleFollowClick = async (userId: number) => {
    //서버액션 요청 보내기
    await postFollow(userId);
  };

  const handleUnFollowClick = async (userId: number) => {
    //서버액션 요청 보내기
    await deleteFollow(userId);
  };

  return isFollowing ? (
    <Button variant='tertiary' onClick={() => handleUnFollowClick(userId)}>
      팔로우 취소
    </Button>
  ) : (
    <Button onClick={() => handleFollowClick(userId)}>팔로우</Button>
  );
};

export default FollowTrigger;
