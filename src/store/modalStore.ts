import { ComponentType } from 'react';

import { create } from 'zustand';

type Component = ComponentType;
//Component의 타입은 컴포넌트 함수 자체(jsx 말구)
//jsx가 더 익숙하고 편하시겠지만 shadcn dialog Portal 함께 사용하기 위해
//이런 식으로 받았습니다.

type ModalState = {
  stack: Component[];
  push: (modal: Component) => void;
  pop: () => void;
  clear: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  stack: [], //모달을 담아둘 스택
  push: (modal) => set((state) => ({ stack: [...state.stack, modal] })), //모달 추가
  pop: () => set((state) => ({ stack: state.stack.slice(0, -1) })), //모달 빼기
  clear: () => set({ stack: [] }), //초기화
}));
