import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Dialog, DialogContent } from '../ui/dialog';

type ModalType = 'compare' | 'follower' | 'basic';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showCloseButton?: boolean;
  variant: ModalType;
  className?: string;
  children: ReactNode;
}

const contentStyle = {
  basic: '',
  follower: 'md:w-[500px] xl:w-[500px]',
  compare: 'md:w-[500px] xl:w-[500px] gap-[30px]',
};

const Modal = ({
  open,
  onOpenChange,
  showCloseButton = true,
  variant = 'basic',
  className,
  children,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={cn(className, contentStyle[variant])}
      >
        {/*본격적인 모달 컨텐츠*/}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
