'use client';

import Image from 'next/image';

import { useCustomizerStore } from '@features/customizer';

import type { IScrubberPreviewProps } from './types';

const VIDEO_ID = 'Ufzk5xf8Rho';

export function ScrubberPreview({ labels, disabled = false }: IScrubberPreviewProps) {
  const { selectedCat, customGif, height, top } = useCustomizerStore();
  const imgSrc = selectedCat === '__custom__' && customGif ? customGif : `/cats/${selectedCat}`;
  const progress = 42;

  return (
    <div className={`card p-6 space-y-4 relative${disabled ? ' opacity-50' : ''}`}>
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{labels.label}</p>

      {disabled && <div className="absolute inset-0 z-10 rounded-xl cursor-not-allowed" />}

      <div className="rounded-lg overflow-hidden bg-black aspect-video relative">
        <iframe
          src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&autoplay=1&mute=1&controls=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />

        <div
          className="absolute bottom-0 left-0 right-0 px-3 pb-3 space-y-1 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
        >
          <div className="relative h-[3px] w-full bg-zinc-500/60 rounded-full">
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
                src={imgSrc}
                alt="cat scrubber"
                width={60}
                height={height}
                style={{ height: `${height}px`, width: 'auto' }}
                unoptimized
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-300 text-[10px]">
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
