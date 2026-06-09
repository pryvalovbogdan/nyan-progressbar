'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useExtensionDetected } from '@shared/lib/useExtensionDetected';

import type { IExtensionBannerProps } from './types';

export type { BannerLabels } from './types';

const EXTENSION_ID = process.env.NEXT_PUBLIC_PROD_EXTENSION_ID ?? '';
const CWS_URL = `https://chromewebstore.google.com/detail/nyan-cat-extension/${EXTENSION_ID}`;

export function ExtensionBanner({ labels }: IExtensionBannerProps) {
  const detected = useExtensionDetected();
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || detected !== false || dismissed) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm"
      style={{ height: '100dvh' }}
      onClick={() => setDismissed(true)}
    >
      <div
        className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full max-w-xl rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 sm:p-5 overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-amber-400 to-orange-400" />

        <div className="flex items-center gap-4 pl-3 flex-1 min-w-0">
          <div className="shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-border bg-card">
            <Image
              src="/cats/catty.gif"
              alt="Nyan cat"
              width={48}
              height={48}
              unoptimized
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0 space-y-0.5">
            <p className="text-sm font-semibold text-foreground">{labels.heading}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{labels.description}</p>
          </div>
        </div>

        <button
          onClick={() => setDismissed(true)}
          aria-label={labels.dismiss}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="pl-3 shrink-0">
          <a
            href={CWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#80deea] text-background text-xs font-semibold hover:bg-[#80deea]/90 transition-colors whitespace-nowrap"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
            {labels.cta}
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
