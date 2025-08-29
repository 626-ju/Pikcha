'use client';

import { DialogDescription } from '@radix-ui/react-dialog';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '@/app/error';
import Modal from '@/components/common/ModalUi';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FollowType } from '@/types/profile/follow';

import FollowInfoList from '../FollowInfoList';

interface Props {
  username: string;
  type: FollowType;
}
const FollowModalContent = ({ username, type }: Props) => {
  const title = `${username}님을 ${type === 'followers' ? '팔로우' : '팔로잉'} 하는 유저`;

  return (
    //팔로워나 비교하기 모달일 때만 버라이언트 주시면 됩니다
    <Modal variant={'follower'}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription aria-labelledby={title} />
      </DialogHeader>

      <div>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <FollowInfoList type={type} />
        </ErrorBoundary>
      </div>
    </Modal>
  );
};

export default FollowModalContent;
