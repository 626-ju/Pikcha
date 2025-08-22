'use client';

import { useModalStore } from '@/store/modalStore';

const ModalContainer = () => {
  const stack = useModalStore((state) => state.stack);

  if (stack.length === 0) return null;

  const Component = stack[stack.length - 1];

  return <Component />;
};

export default ModalContainer;
