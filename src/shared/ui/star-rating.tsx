'use client';

import { Star } from 'lucide-react';

import { cn } from '@shared/lib/utils';

interface IStarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  ariaLabel?: (n: number) => string;
  className?: string;
}

export function StarRating({ value, onChange, max = 5, ariaLabel, className }: IStarRatingProps) {
  return (
    <div className={cn('flex gap-1', className)} role="radiogroup">
      {Array.from({ length: max }, (_, i) => i + 1).map(n => {
        const active = n <= value;

        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={ariaLabel ? ariaLabel(n) : `${n}`}
            onClick={() => onChange(n)}
            className="p-1 rounded-md transition-all duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80deea]/50"
          >
            <Star
              className={cn(
                'w-7 h-7 transition-colors',
                active ? 'fill-[#80deea] text-[#80deea]' : 'fill-transparent text-muted-foreground',
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
