import Modal from '@/components/common/ModalUi';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FollowModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function FollowerModal({ isOpen, setIsOpen }: FollowModalProps) {
  const title = `${'성주'}님을 팔로우 하는 유저`; //추후 username 받아오기

  // function handleSubmit() {
  //   // ...
  // }

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen} showCloseButton={true}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>

      <div>
        {/* <FollowUserList username={usename} /> */}
        아아 모달 테스트입니당
      </div>
      {/*버튼이 없을 경우 여기서 끝*/}
      {/*버튼이 있을 경우 임포트해서 호출 + 프롭으로 받은 onSubmit 달아주기*/}
      {/* <DialogFooter>
        <Button variant='regist' onSubmit={handleSubmit}>
          등록하기
        </Button>
      </DialogFooter> */}
    </Modal>
  );
}
