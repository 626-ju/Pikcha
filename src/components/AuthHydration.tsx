'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/store/authStore';

import type { Session } from 'next-auth';

// 이 컴포넌트는 클라이언트 컴포넌트로 동작해야 합니다.
// 서버 컴포넌트에서 받은 초기 세션 데이터를 주입하는 역할.
export default function AuthHydration({ session }: { session: Session | null }) {
  const setUser = useAuthStore((state) => state.setUser);

  // 컴포넌트가 마운트될 때 한 번만 실행
  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        // 기타 필요한 속성 (예: role) 추가
      });
    } else {
      setUser(null);
    }
  }, [session, setUser]);

  // UI를 렌더링하지 않습니다.
  return null;
}
