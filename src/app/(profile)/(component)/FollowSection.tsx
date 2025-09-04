'use client';

import { deleteFollow, postFollow } from '@/actions/profile/handleFollow';
import useOptimisticToggle from '@/hooks/useOptimisticToggle';
import { useUserInfoStore } from '@/store/userInfoStore';
import { fetchUserRes } from '@/types/profile/fetchUserRes';

import FollowerModalTrigger from './FollowModalTrigger';
import FollowTrigger from './FollowTrigger';
import UpdateTrigger from './UpdateTrigger';

interface Props {
  myPage: boolean;
  //내부에서 truncated함수 또 돌리기 싫어서 이름이랑 설명은 그냥 따로 받았습니다
  username: string;
  description: string;
  //추후에 객체로 내려주는 것 땜에 문제 생기면 다시 풀어서 내려주겠습니다ㄴ
  data: fetchUserRes;
}

const FollowSection = ({ myPage, username, description, data }: Props) => {
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

  setUserInfo({ nickname: username, description, image: data.image, userid: data.id });

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
        <UpdateTrigger />
      ) : (
        <FollowTrigger isFollowing={optimisticFollowing} onToggle={handleToggle} />
      )}
    </>
  );
};

export default FollowSection;
