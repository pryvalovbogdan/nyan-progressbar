'use client';

import { useCountUp } from '../hooks';
import type { IStatCardProps } from './types';

export function StatCard({ target, unit, label, started, duration }: IStatCardProps) {
  const count = useCountUp(target, started, duration);

  return (
    <div className="flex flex-col items-center gap-2 p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-[#80deea]/40 hover:shadow-[0_4px_24px_rgba(128,222,234,0.12)] transition-all duration-300">
      <span className="text-4xl sm:text-5xl font-bold tabular-nums text-[#80deea] leading-none">
        {count.toLocaleString()}
        {unit}
      </span>
      <span className="text-sm text-muted-foreground text-center leading-tight">{label}</span>
    </div>
  );
}
