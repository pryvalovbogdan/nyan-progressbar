'use client';

import { Check } from 'lucide-react';

import { cn } from '@shared/lib/utils';

import type { ISelectableCardProps } from './types';

export function SelectableCard({
  selected,
  children,
  showCheck = true,
  selectedClassName,
  className,
  ...buttonProps
}: ISelectableCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        'relative text-left rounded-xl border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80deea]/50',
        selected
          ? cn('-translate-y-0.5', selectedClassName ?? 'border-[#80deea] shadow-[0_4px_16px_rgba(128,222,234,0.2)]')
          : 'border-border hover:border-border/80 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
        className,
      )}
      {...buttonProps}
    >
      {showCheck ? (
        <span
          className={cn(
            'absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200',
            selected ? 'bg-[#80deea] scale-100 opacity-100' : 'scale-75 opacity-0',
          )}
          aria-hidden="true"
        >
          <Check className="w-3 h-3 text-background stroke-[3]" />
        </span>
      ) : null}
      {children}
    </button>
  );
}
