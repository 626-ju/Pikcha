import { useEffect, useRef, useState } from 'react';

const useOptimisticToggle = ({
  initialCount = 0,
  initialState,
  asyncAction,
}: {
  initialCount?: number;
  initialState: boolean;
  asyncAction: () => Promise<void>;
}) => {
  const [isToggled, setIsToggled] = useState(initialState);
  const [optimisticCount, setOptimisticCount] = useState(initialCount);
  const clickCountRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout>(null);

  const handleToggle = () => {
    const newToggleState = !isToggled;
    const newCount = newToggleState ? optimisticCount + 1 : optimisticCount - 1;

    setIsToggled(newToggleState);
    setOptimisticCount(newCount);

    clickCountRef.current += 1;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(async () => {
      if (clickCountRef.current % 2 !== 0) {
        try {
          await asyncAction();
        } catch (error) {
          console.error('Failse API update:', error);
          setIsToggled(initialState);
          setOptimisticCount(initialCount);
        }
      }
      clickCountRef.current = 0;
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { isToggled, optimisticCount, handleToggle };
};

export default useOptimisticToggle;
