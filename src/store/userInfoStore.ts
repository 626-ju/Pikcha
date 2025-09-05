//혹시 gnb에서 필요한 정보가 다 들어간다면 이 파일은 지우고 그 스토어 사용

import { create } from 'zustand';

interface UserInfoType {
  userid: number;
  nickname: string;
  description: string;
  image?: string;
}

interface UserInfoStore extends UserInfoType {
  setUserInfo: (data: Partial<UserInfoType>) => void;
  resetUserInfo: () => void;
}

export const useUserInfoStore = create<UserInfoStore>((set) => ({
  userid: 0,
  nickname: '',
  description: '',
  image: '',

  setUserInfo: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  resetUserInfo: () =>
    set({
      nickname: '',
      description: '',
      image: undefined,
    }),
}));
