'use client';

import { deleteFollow, postFollow } from '@/actions/profile/handleFollow';
import useOptimisticToggle from '@/hooks/useOptimisticToggle';

import FollowerModalTrigger from './FollowModalTrigger';
import FollowTrigger from './FollowTrigger';
import UpdateTrigger from './UpdateTrigger';

interface Props {
  myPage: boolean;
  userid: number;
  username: string;
  description: string;
  image: string;
  isFollowing: boolean;
  followersCount: number;
  followeesCount: number;
}

const FollowSection = ({
  myPage,
  userid,
  username,
  description,
  image,
  isFollowing,
  followersCount,
  followeesCount,
}: Props) => {
  const {
    isToggled: optimisticFollowing,
    optimisticCount,
    handleToggle,
  } = useOptimisticToggle({
    initialState: isFollowing,
    initialCount: followersCount,
    asyncAction: async () => {
      if (!optimisticFollowing) {
        await postFollow(userid);
      } else {
        await deleteFollow(userid);
      }
    },
  });

  return (
    <>
      <FollowerModalTrigger
        followers={optimisticCount}
        followees={followeesCount}
        username={username}
      />
      {myPage ? (
        <UpdateTrigger nickname={username} description={description} image={image} />
      ) : (
        <FollowTrigger isFollowing={optimisticFollowing} onToggle={handleToggle} />
      )}
    </>
  );
};

export default FollowSection;
