import { DialogDescription } from '@radix-ui/react-dialog';

import Modal from '@/components/common/ModalUi';
import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FollowModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const FollowerModal = ({ isOpen, setIsOpen }: FollowModalProps) => {
  const title = `${'성주'}님을 팔로우 하는 유저`; //추후 username 받아오기

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen} showCloseButton={true} variant={'follower'}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription aria-labelledby={title} />
      </DialogHeader>

      <div>
        {/* <FollowUserList username={usename} /> */}
        아아 모달 테스트입니당
      </div>
      {/*버튼이 없을 경우 여기서 끝*/}
      {/*버튼이 있을 경우 임포트해서 호출 + 프롭으로 받은 onSubmit 달아주기*/}
      <DialogFooter>
        <button>등록하기</button>
      </DialogFooter>
    </Modal>
  );
};
