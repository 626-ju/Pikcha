import { create } from 'zustand';

interface User {
  id: string | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
  // role: string; // 예시로 추가된 사용자 역할 : 커스텀 가능
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));
