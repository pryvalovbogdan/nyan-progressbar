'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { IStepImageProps } from './types';

export function StepImage({ src, alt, width, height, sizes, priority }: IStepImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', handleKey);

    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="block w-full cursor-zoom-in" aria-label={alt}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="w-full h-auto"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              unoptimized
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto rounded-lg object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
