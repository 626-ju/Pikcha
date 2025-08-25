'use client';

import { DialogDescription } from '@radix-ui/react-dialog';

import Modal from '@/components/common/ModalUi';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

import FollowList from './FollowList';

export const FolloweeModal = () => {
  const title = `${'성주'}님을 팔로우 하는 유저`; //추후 username 받아오기

  return (
    //팔로워나 비교하기 모달일 때만 버라이언트 주시면 됩니다
    <Modal variant={'follower'}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription aria-labelledby={title} />
      </DialogHeader>

      <div>
        <FollowList type='followees' />
      </div>
      {/*버튼이 없을 경우 여기서 끝*/}
      {/*버튼이 있을 경우 임포트해서 호출 + 프롭으로 받은 onSubmit 달아주기*/}
      {/* <DialogFooter>
        <button>등록하기</button>
      </DialogFooter> */}
    </Modal>
  );
};

export const FollowerModal = () => {
  const title = `${'성주'}님을 팔로우 하는 유저`; //추후 username 받아오기

  return (
    //팔로워나 비교하기 모달일 때만 버라이언트 주시면 됩니다
    <Modal variant={'follower'}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription aria-labelledby={title} />
      </DialogHeader>

      <div>
        <FollowList type='followers' />
      </div>
      {/*버튼이 없을 경우 여기서 끝*/}
      {/*버튼이 있을 경우 임포트해서 호출 + 프롭으로 받은 onSubmit 달아주기*/}
      {/* <DialogFooter>
        <button>등록하기</button>
      </DialogFooter> */}
    </Modal>
  );
};
