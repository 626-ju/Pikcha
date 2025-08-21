import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Dialog, DialogContent } from '../ui/dialog';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showCloseButton?: boolean;
  children: ReactNode;
  className?: string;
}

const Modal = ({ open, onOpenChange, showCloseButton = true, className, children }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={cn('미리 지정할 클래스네임', className)}
      >
        {/*본격적인 모달 컨텐츠*/}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
