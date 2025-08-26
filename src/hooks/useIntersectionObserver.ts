'use client';

import { RefObject, useEffect, useRef } from 'react';

type IntersectionObserverCallback = () => void;

export function useIntersectionObserver(
  targetRef: RefObject<HTMLElement | null>,
  cursor: number | null,
  onIntersect: IntersectionObserverCallback = () => {},
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!targetRef.current || cursor === null) return;

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && cursor !== null) onIntersect();
        },
        { threshold: 0.1 },
      );
    }

    observerRef.current.observe(targetRef.current);

    return () => {
      if (cursor === null && observerRef.current) observerRef.current.disconnect();
    };
  }, [targetRef, onIntersect, cursor]);
}
