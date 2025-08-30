'use client';

import React from 'react';

import Button from '@/components/ui/Buttons';

interface Props {
  isFollowing: boolean;
}

const FollowTrigger = ({ isFollowing }: Props) => {
  const handleFollowClick = () => {
    //서버액션 요청 보내기
  };

  const handleUnFollowClick = () => {
    //서버액션 요청 보내기
  };

  return isFollowing ? (
    <Button variant='tertiary' onClick={handleUnFollowClick}>
      팔로우 취소
    </Button>
  ) : (
    <Button onClick={handleFollowClick}>팔로우</Button>
  );
};

export default FollowTrigger;
