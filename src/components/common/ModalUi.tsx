'use client';

import { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';

import { Dialog, DialogContent } from '../ui/dialog';

type ModalType = 'compare' | 'follower' | 'basic';

interface Props {
  showCloseButton?: boolean;
  variant?: ModalType;
  className?: string;
  children: ReactNode;
}

const contentStyle = {
  basic: '',
  follower: 'md:w-[500px] xl:w-[500px]',
  compare: 'md:w-[500px] xl:w-[500px] gap-[30px]',
};

const Modal = ({ showCloseButton = true, variant = 'basic', className, children }: Props) => {
  const close = useModalStore((state) => state.close);

  return (
    <Dialog open={true} onOpenChange={close}>
      <DialogContent
        className={cn(className, contentStyle[variant])}
        showCloseButton={showCloseButton}
      >
        {/*본격적인 모달 컨텐츠*/}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
