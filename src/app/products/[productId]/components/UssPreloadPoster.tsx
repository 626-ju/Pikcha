'use client';
import { useEffect } from 'react';

const UsePreloadPoster = ({ src }: { src: string }) => {
  useEffect(() => {
    if (!src) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [src]);

  return null;
};

export default UsePreloadPoster;
