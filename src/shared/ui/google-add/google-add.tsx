'use client';

import { useEffect, useRef } from 'react';

import type { IGoogleAdProps } from './types';

export function GoogleAd({ slot, format = 'auto', responsive = 'true', className = '' }: IGoogleAdProps) {
  const adRef = useRef<HTMLModElement>(null);
  const clientPubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

  useEffect(() => {
    if (window.adsbygoogle && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense initialization error: ', err);
      }
    }
  }, []);

  if (!clientPubId || !slot) return null;

  return (
    <div className={`w-full overflow-hidden flex justify-center items-center my-4 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        data-ad-client={clientPubId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
