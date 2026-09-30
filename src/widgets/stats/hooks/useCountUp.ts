import { useEffect, useState } from 'react';

import { useReducedMotion } from '@shared/hooks/useReducedMotion';

export function useCountUp(target: number, started: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!started) return;

    if (reducedMotion) {
      setCount(target);

      return;
    }

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [started, target, duration, reducedMotion]);

  return count;
}
