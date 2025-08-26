'use client';

import { DialogDescription } from '@radix-ui/react-dialog';

import Modal from '@/components/common/ModalUi';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useFetchUserList from '@/hooks/useFetchUserList';
import { FollowType } from '@/types/profile/follow';

import FollowList from './FollowList';

interface Props {
  username: string;
  type: FollowType;
}
const FollowModalContent = ({ username, type }: Props) => {
  const title = `${username}님을 ${type === 'followers' ? '팔로우' : '팔로잉'} 하는 유저`; //추후 username 받아오기

  const { userList, error, fetchFollowInfo, cursor } = useFetchUserList(type);

  return (
    //팔로워나 비교하기 모달일 때만 버라이언트 주시면 됩니다
    <Modal variant={'follower'}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription aria-labelledby={title} />
      </DialogHeader>

      <div>
        <FollowList
          type={type}
          userList={userList}
          error={error}
          fetchFollowInfo={fetchFollowInfo}
          cursor={cursor}
        />
      </div>
    </Modal>
  );
};

export default FollowModalContent;
