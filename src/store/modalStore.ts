import { ComponentType } from 'react';

import { create } from 'zustand';

//eslint-disable-next-line
interface Component<P = any> {
  component: ComponentType<P>;
  props?: P;
}

type ModalState = {
  stack: Component[];
  open: (modal: Component) => void;
  close: () => void;
  clear: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  stack: [], //모달을 담아둘 스택
  open: (modal) => set((state) => ({ stack: [...state.stack, modal] })), //모달 추가
  close: () => set((state) => ({ stack: state.stack.slice(0, -1) })), //모달 빼기
  clear: () => set({ stack: [] }), //초기화
}));
