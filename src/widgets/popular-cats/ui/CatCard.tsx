'use client';

import Image from 'next/image';

import { useHeartAnimation } from '@shared/lib/useHeartAnimation';

import { DEFAULT_RANK_STYLE, HEART_PATH, RANK_STYLES } from './consts';
import type { ICatCardProps } from './types';

export function CatCard({ cat, rank, isSelected, onSelect }: ICatCardProps) {
  const { hearts, spawnHearts, removeHeart } = useHeartAnimation();
  const style = RANK_STYLES[rank] ?? DEFAULT_RANK_STYLE;

  return (
    <button
      onClick={() => onSelect(cat.src)}
      onMouseEnter={spawnHearts}
      className={`relative flex cursor-pointer flex-col rounded-xl border bg-card overflow-visible text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(128,222,234,0.2)] ${
        isSelected
          ? 'border-[#80deea] shadow-[0_0_0_1px_#80deea,0_4px_16px_rgba(128,222,234,0.2)]'
          : 'border-border hover:border-[#80deea]'
      }`}
    >
      <div className="relative aspect-square bg-muted w-full rounded-t-xl overflow-hidden">
        <Image src={`/cats/${cat.src}`} alt={cat.name} fill unoptimized className="object-cover" />
        <span
          className={`absolute top-2 left-2 text-[11px] font-bold leading-none px-1.5 py-1 rounded-md ${style.badge}`}
        >
          #{rank}
        </span>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <span className="text-sm font-semibold truncate">{cat.name}</span>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
            <div className={`h-full rounded-full ${style.bar}`} style={{ width: `${cat.percentage}%` }} />
          </div>
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">{cat.percentage}%</span>
        </div>
      </div>

      {hearts.map(heart => (
        <svg
          key={heart.id}
          viewBox="0 0 24 24"
          fill={heart.color}
          className="donate-heart absolute pointer-events-none"
          onAnimationEnd={() => removeHeart(heart.id)}
          style={
            {
              left: `calc(50% + ${heart.x}px)`,
              width: heart.size,
              height: heart.size,
              '--heart-delay': `${heart.delay}ms`,
              '--heart-duration': `${heart.duration}ms`,
              '--heart-rotate': `${heart.rotate}deg`,
            } as React.CSSProperties
          }
        >
          <path d={HEART_PATH} />
        </svg>
      ))}
    </button>
  );
}
