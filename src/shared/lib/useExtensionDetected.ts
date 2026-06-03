'use client';

import { useEffect, useState } from 'react';

const isDev = process.env.NODE_ENV === 'development';

const EXTENSION_ID = !isDev ? process.env.NEXT_PUBLIC_LOCAL_EXTENSION_ID : process.env.NEXT_PUBLIC_PROD_EXTENSION_ID;

export function useExtensionDetected(): boolean | null {
  const [detected, setDetected] = useState<boolean | null>(null);

  useEffect(() => {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if (!isChrome) {
      setDetected(false);

      return;
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

    img.src = `chrome-extension://${EXTENSION_ID}/assets/icon128.png`;

    return () => clearTimeout(timer);
  }, []);

  return detected;
}
