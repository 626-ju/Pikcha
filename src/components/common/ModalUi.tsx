'use client';

import { ReactNode, useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

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
  const clearModal = useModalStore((state) => state.clearModal);

  const pathName = usePathname();
  const pathRef = useRef(pathName);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  //뒤로가기 클릭 시 모달 초기화
  useEffect(() => {
    if (pathName !== pathRef.current) clearModal();
  }, [pathName, clearModal]);

  return (
    <Dialog
      open={true}
      onOpenChange={() => {
        closeModal();
      }}
    >
      <DialogContent
        className={cn(className, 'min-w-[375px]', contentStyle[variant])}
        showCloseButton={showCloseButton}
      >
        {/*본격적인 모달 컨텐츠*/}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
