'use client';

import { useModalStore } from '@/store/modalStore';

const ModalContainer = () => {
  const stack = useModalStore((state) => state.stack);

  if (stack.length === 0) return null;

  const target = stack[stack.length - 1];
  const Component = target.component;
  const props = target.props;

  return <Component {...props} />;
};

export default ModalContainer;
