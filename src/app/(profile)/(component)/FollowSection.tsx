'use client';

import { deleteFollow, postFollow } from '@/actions/profile/handleFollow';
import useOptimisticToggle from '@/hooks/useOptimisticToggle';
import { fetchUserRes } from '@/types/profile/fetchUserRes';

import FollowerModalTrigger from './FollowModalTrigger';
import FollowTrigger from './FollowTrigger';
import UpdateTrigger from './UpdateTrigger';

interface Props {
  myPage: boolean;
  username: string;
  description: string;
  data: fetchUserRes;
}

const FollowSection = ({ myPage, username, description, data }: Props) => {
  const {
    isToggled: optimisticFollowing,
    optimisticCount,
    handleToggle,
  } = useOptimisticToggle({
    initialState: data.isFollowing,
    initialCount: data.followersCount,
    asyncAction: async () => {
      if (!optimisticFollowing) {
        await postFollow(data.id);
      } else {
        await deleteFollow(data.id);
      }
    },
  });

  return (
    <>
      <FollowerModalTrigger
        followers={optimisticCount}
        followees={data.followeesCount}
        username={username}
      />
      {myPage ? (
        <UpdateTrigger nickname={username} description={description} image={data.image} />
      ) : (
        <FollowTrigger isFollowing={optimisticFollowing} onToggle={handleToggle} />
      )}
    </>
  );
};

export default FollowSection;
