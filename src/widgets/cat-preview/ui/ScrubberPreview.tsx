'use client';

import Image from 'next/image';
import { useCustomizerStore } from '@features/customizer';
import type { Props } from './types';

export function ScrubberPreview({ labels }: Props) {
  const { selectedCat, height, top } = useCustomizerStore();
  const progress = 42;

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{labels.label}</p>

      <div className="rounded-lg overflow-hidden bg-black aspect-video relative flex items-end">
        <div className="absolute inset-0 flex items-center justify-center text-zinc-700 text-sm select-none">
          {labels.player}
        </div>

        <div className="w-full px-3 pb-3 space-y-1">
          <div className="relative h-[3px] w-full bg-zinc-700 rounded-full">
            <div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(to right, #ff0000, #ff7700, #ffff00, #00ff00, #0000ff, #8b00ff)',
              }}
            />

            <div
              className="absolute"
              style={{
                left: `${progress}%`,
                top: `${top}px`,
                transform: 'translateX(-50%)',
              }}
            >
              <Image
                src={`/cats/${selectedCat}`}
                alt="cat scrubber"
                width={60}
                height={height}
                style={{ height: `${height}px`, width: 'auto' }}
                unoptimized
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-400 text-[10px]">
            <span>▶</span>
            <span>0:42 / 1:40</span>
            <div className="ml-auto flex gap-1">
              <span>⚙</span>
              <span>⛶</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
