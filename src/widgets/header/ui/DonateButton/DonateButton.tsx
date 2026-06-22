'use client';

import Link from 'next/link';

import { useHeartAnimation } from '@shared/hooks/useHeartAnimation';
import { cn } from '@shared/lib/utils';

import type { IDonateButtonProps } from './types';

export function DonateButton({ href, label, isActive }: IDonateButtonProps) {
  const { hearts, spawnHearts, removeHeart } = useHeartAnimation();

  return (
    <Link
      href={href}
      onMouseEnter={spawnHearts}
      className={cn(
        'btn-press relative ml-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold hover:scale-[1.05] hover:shadow-[0_0_16px_rgba(255,100,130,0.4)] overflow-visible text-white',
        isActive ? 'gradient-heart' : 'gradient-heart-dim',
      )}
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      {label}

      {hearts.map(heart => (
        <svg
          key={heart.id}
          viewBox="0 0 24 24"
          fill={heart.color}
          className="donate-heart absolute"
          onAnimationEnd={() => removeHeart(heart.id)}
          style={
            {
              left: `calc(50% + ${heart.x}px)`,
              width: heart.size,
              height: heart.size,
              color: heart.color,
              '--heart-delay': `${heart.delay}ms`,
              '--heart-duration': `${heart.duration}ms`,
              '--heart-rotate': `${heart.rotate}deg`,
            } as React.CSSProperties
          }
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </Link>
  );
}
