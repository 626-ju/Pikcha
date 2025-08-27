'use client';

import { RefObject, useEffect, useRef } from 'react';

type IntersectionObserverCallback = () => void;

export function useIntersectionObserver(
  targetRef: RefObject<HTMLElement | null>,
  cursor: number | null,
  onIntersect: IntersectionObserverCallback = () => {},
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const cursorRef = useRef(cursor);

  useEffect(() => {
    cursorRef.current = cursor;
  }, [cursor]);

  useEffect(() => {
    if (!targetRef.current) return;

    if (observerRef.current === null) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && cursorRef.current !== null) onIntersect();
        },
        { threshold: 0.1 },
      );
    }

    observerRef.current.observe(targetRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = null;
    };
  }, [onIntersect]);
}
