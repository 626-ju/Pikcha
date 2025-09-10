'use client';

import { useEffect, useState } from 'react';

import { Moon, Sun } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    setIsDark(root.classList.contains('dark'));
  }, []);

  if (!mounted) {
    return (
      <div className='inline-flex h-9 w-9 items-center justify-center rounded-md border opacity-70'>
        <span className='sr-only'>테마</span>
      </div>
    );
  }

  const toggleTheme = () => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
      document.cookie = `theme=light; path=/; max-age=31536000; samesite=lax`;
      setIsDark(false);
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      document.cookie = `theme=dark; path=/; max-age=31536000; samesite=lax`;
      setIsDark(true);
    }
  };

  const position = 'fixed right-10 bottom-30';
  const sizeShape = 'inline-flex h-15 w-15 items-center justify-center rounded-full';
  const interaction = 'transition active:scale-95 focus:outline-none ';
  const border = 'border border-transparent';
  const color = 'text-white light:bg-orange-500 bg-indigo-800 dark:hover:bg-indigo-700';

  return (
    <button
      type='button'
      onClick={toggleTheme}
      aria-pressed={isDark}
      title={isDark ? '다크 → 라이트' : '라이트 → 다크'}
      data-theme-applied={isDark ? 'dark' : 'light'}
      className={cn(position, sizeShape, interaction, border, color)}
    >
      {isDark ? <Moon /> : <Sun />}
      <span className='sr-only'>{isDark ? '다크 → 라이트' : '라이트 → 다크'}</span>
    </button>
  );
}
