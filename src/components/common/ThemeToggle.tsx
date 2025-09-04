// src/components/common/ThemeToggle.tsx
'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

/**
 * 라이트/다크/시스템 3단 토글
 * - Tailwind v4 + next-themes(class 전략) 조합
 * - 마운트 후에만 현재 테마 노출(SSR 깜빡임 방지)
 */
export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // 마운트 이전에는 UI만 보여주고 값 렌더링은 생략
  if (!mounted) {
    return (
      <div className='inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm'>
        테마
        <span className='opacity-60'>(…)</span>
      </div>
    );
  }

  return (
    <div className='inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm'>
      <button
        type='button'
        onClick={() => setTheme('light')}
        className={`rounded px-2 py-1 ${resolvedTheme === 'light' ? 'bg-secondary text-secondary-foreground' : ''}`}
        aria-pressed={resolvedTheme === 'light'}
      >
        Light
      </button>
      <button
        type='button'
        onClick={() => setTheme('dark')}
        className={`rounded px-2 py-1 ${resolvedTheme === 'dark' ? 'bg-secondary text-secondary-foreground' : ''}`}
        aria-pressed={resolvedTheme === 'dark'}
      >
        Dark
      </button>
      <button
        type='button'
        onClick={() => setTheme('system')}
        className={`rounded px-2 py-1 ${theme === 'system' ? 'bg-secondary text-secondary-foreground' : ''}`}
        aria-pressed={theme === 'system'}
        title='시스템 테마를 따릅니다'
      >
        System
      </button>
    </div>
  );
}
