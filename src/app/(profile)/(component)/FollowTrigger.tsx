'use client';

import Button from '@/components/ui/Buttons';

interface Props {
  isFollowing: boolean;
  onToggle: () => void;
}

const FollowTrigger = ({ isFollowing, onToggle }: Props) => {
  return isFollowing ? (
    <Button variant='tertiary' onClick={onToggle}>
      팔로우 취소
    </Button>
  ) : (
    <Button onClick={onToggle}>팔로우</Button>
  );
};

export default FollowTrigger;
