'use client';

import Image from 'next/image';
import { useCustomizerStore } from '@features/customizer';
import type { IScrubberCardProps } from './types';

export function ScrubberCard({ cat, disabled = false, tooltip, onSelect }: IScrubberCardProps) {
  const { selectedCat, setSelectedCat } = useCustomizerStore();
  const isSelected = selectedCat === cat.src;

  function handleClick() {
    if (disabled) return;

    setSelectedCat(cat.src);

    onSelect?.(cat.src);
  }

  return (
    <div className="relative group">
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`relative aspect-square w-full rounded-xl border bg-card p-3 flex items-center justify-center transition-all duration-200 ${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : `cursor-pointer hover:-translate-y-1 hover:border-[#80deea] hover:shadow-[0_4px_16px_rgba(128,222,234,0.2)] ${
                isSelected
                  ? 'border-[#80deea] shadow-[0_0_0_1px_#80deea,0_4px_16px_rgba(128,222,234,0.2)] -translate-y-0.5'
                  : 'border-border'
              }`
        }`}
      >
        <Image
          src={`/cats/${cat.src}`}
          alt={cat.src.replace('.gif', '')}
          width={64}
          height={64}
          className="object-contain w-full h-full"
          unoptimized
        />
      </button>

      {tooltip && (
        <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-popover text-popover-foreground text-xs rounded-lg px-2.5 py-1.5 whitespace-nowrap shadow-md border border-border">
            {tooltip}
          </div>
          <div className="w-2 h-2 bg-popover border-r border-b border-border rotate-45 mx-auto -mt-1" />
        </div>
      )}
    </div>
  );
}
