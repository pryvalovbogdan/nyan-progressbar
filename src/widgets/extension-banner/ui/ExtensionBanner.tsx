'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const EXTENSION_ID = 'oadlabdleegopgjlkcmjjogeaceagbie';
const CWS_URL = `https://chromewebstore.google.com/detail/nyan-cat-extension/${EXTENSION_ID}`;

// Detects extension by attempting to load a web-accessible resource.
// The extension manifest must declare the resource in web_accessible_resources
// with matches: ["https://nyanprogressbar.com/*"] for this to work.
function useExtensionDetected() {
  const [detected, setDetected] = useState<boolean | null>(null);

  useEffect(() => {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if (!isChrome) {
      setDetected(false);

      return undefined;
    }

    const img = new window.Image();
    const timer = setTimeout(() => setDetected(false), 1500);

    img.onload = () => {
      clearTimeout(timer);
      setDetected(true);
    };

    img.onerror = () => {
      clearTimeout(timer);
      setDetected(false);
    };

    img.src = `chrome-extension://${EXTENSION_ID}/icon128.png`;

    return () => clearTimeout(timer);
  }, []);

  return detected;
}

export interface BannerLabels {
  heading: string;
  description: string;
  cta: string;
  dismiss: string;
}

interface Props {
  labels: BannerLabels;
}

export function ExtensionBanner({ labels }: Props) {
  const detected = useExtensionDetected();
  const [dismissed, setDismissed] = useState(false);

  if (detected !== false || dismissed) return null;

  return (
    <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-amber-400/30 bg-amber-400/5 p-4 sm:p-5 overflow-hidden">
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

      <div className="flex items-center gap-2 pl-3 sm:pl-0 shrink-0">
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

        <button
          onClick={() => setDismissed(true)}
          aria-label={labels.dismiss}
          className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
