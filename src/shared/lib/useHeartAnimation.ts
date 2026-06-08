'use client';

import { useCallback, useState } from 'react';

export interface Heart {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
}

export const HEART_COLORS = ['#ff6b8a', '#ff4d4d', '#ff8c42', '#c084fc', '#80deea', '#fbbf24', '#f472b6', '#a78bfa'];

export function useHeartAnimation() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const spawnHearts = useCallback(() => {
    const newHearts: Heart[] = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 70 - 35,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      size: 9 + Math.random() * 9,
      delay: i * 55,
      duration: 1300 + Math.random() * 400,
      rotate: Math.random() * 30 - 15,
    }));

    setHearts(prev => [...prev, ...newHearts]);
  }, []);

  const removeHeart = useCallback((id: number) => {
    setHearts(prev => prev.filter(h => h.id !== id));
  }, []);

  return { hearts, spawnHearts, removeHeart };
}
