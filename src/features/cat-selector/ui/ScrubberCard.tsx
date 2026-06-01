'use client';

import Image from 'next/image';
import { useCustomizerStore } from '@features/customizer';
import type { ScrubberCardProps } from './types';

export function ScrubberCard({ cat }: ScrubberCardProps) {
  const { selectedCat, setSelectedCat } = useCustomizerStore();
  const isSelected = selectedCat === cat.src;

  return (
    <button
      onClick={() => setSelectedCat(cat.src)}
      className={`relative aspect-square rounded-xl border bg-card p-3 flex items-center justify-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-[#80deea] hover:shadow-[0_4px_16px_rgba(128,222,234,0.2)] ${
        isSelected
          ? 'border-[#80deea] shadow-[0_0_0_1px_#80deea,0_4px_16px_rgba(128,222,234,0.2)] -translate-y-0.5'
          : 'border-border'
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
  );
}
