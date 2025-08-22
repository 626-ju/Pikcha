import { ComponentType } from 'react';

import { create } from 'zustand';

export type Modal = {
  component: ComponentType;
};

type ModalState = {
  stack: Modal[];
  push: (modal: Modal) => void;
  pop: () => void;
  clear: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  stack: [], //모달을 담아둘 스택
  push: (modal) => set((state) => ({ stack: [...state.stack, modal] })), //모달 추가
  pop: () => set((state) => ({ stack: state.stack.slice(0, -1) })), //모달 빼기
  clear: () => set({ stack: [] }), //초기화
}));
