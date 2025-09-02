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
  const closeModal = useModalStore((state) => state.closeModal);

  //스크롤바 거터 때문에 오히려 모달에서는 레이아웃 쉬프트 발생하는 상황.
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollBarWidth}px`;

  return (
    <Dialog
      open={true}
      onOpenChange={() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        closeModal();
      }}
    >
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
