// src/components/common/ThemeToggle.tsx
'use client';

import { useEffect, useState } from 'react';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils'; // 클래스 머지 유틸

/** 단일 버튼 라이트↔다크 토글(시스템 모드 제거) */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme(); // enableSystem=false면 theme===resolvedTheme
  const [mounted, setMounted] = useState(false); // SSR 깜빡임 방지

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className='inline-flex h-9 w-9 items-center justify-center rounded-md border opacity-70'>
        <span className='sr-only'>테마</span>
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark'; // 현재 적용 테마 판별

  const position = 'fixed right-10 bottom-30';
  const sizeShape = 'inline-flex h-15 w-15 items-center justify-center rounded-full';
  const interaction = 'transition active:scale-95 focus:outline-none ';
  const border = 'border border-transparent';
  const color = 'text-white light:bg-orange-500 bg-indigo-800 dark:hover:bg-indigo-700';

  return (
    <button
      type='button'
      onClick={() => setTheme(isDark ? 'light' : 'dark')} // 라이트↔다크 전환
      aria-pressed={isDark}
      title={isDark ? '다크 → 라이트' : '라이트 → 다크'} // 다음 상태 힌트
      data-theme-applied={resolvedTheme} // 스타일 확장용 data-attr
      className={cn(position, sizeShape, interaction, border, color)}
    >
      {isDark ? (
        <Moon /> // 다크 아이콘
      ) : (
        <Sun /> // 라이트 아이콘
      )}
      <span className='sr-only'>{isDark ? '다크 → 라이트' : '라이트 → 다크'}</span>
    </button>
  );
}
