import { ComponentType } from 'react';

import { create } from 'zustand';

//eslint-disable-next-line
interface Component<P = any> {
  component: ComponentType<P>;
  props?: P;
}

type ModalState = {
  stack: Component[];
  openModal: (modal: Component) => void;
  closeModal: () => void;
  clearModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  stack: [], //모달을 담아둘 스택
  openModal: (modal) => set((state) => ({ stack: [...state.stack, modal] })), //모달 추가
  closeModal: () => set((state) => ({ stack: state.stack.slice(0, -1) })), //모달 빼기
  clearModal: () => set({ stack: [] }), //초기화
}));
