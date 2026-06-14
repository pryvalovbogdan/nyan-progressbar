'use client';

import { useEffect, useState } from 'react';

const isDev = process.env.NODE_ENV === 'development';
const CHROME_EXTENSION_ID = isDev
  ? process.env.NEXT_PUBLIC_LOCAL_EXTENSION_ID
  : process.env.NEXT_PUBLIC_PROD_EXTENSION_ID;

export function useExtensionDetected(): boolean | null {
  const [detected, setDetected] = useState<boolean | null>(null);

  useEffect(() => {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    let timer: NodeJS.Timeout;

    if (isChrome && CHROME_EXTENSION_ID) {
      const img = new window.Image();

      timer = setTimeout(() => setDetected(false), 1500);

      img.onload = () => {
        clearTimeout(timer);
        setDetected(true);
      };

      img.onerror = () => {
        clearTimeout(timer);
        setDetected(false);
      };

      img.src = `chrome-extension://${CHROME_EXTENSION_ID}/assets/icon128.png`;

      return () => clearTimeout(timer);
    }

    if (isSafari) {
      const handleMessage = (event: MessageEvent) => {
        if (event.data && event.data.type === 'MY_EXTENSION_INSTALLED') {
          clearTimeout(timer);
          setDetected(true);
        }
      };

      window.addEventListener('message', handleMessage);

      timer = setTimeout(() => {
        setDetected(false);
      }, 1500);

      window.postMessage({ type: 'CHECK_EXTENSION_PRESENT' }, '*');

      return () => {
        window.removeEventListener('message', handleMessage);
        clearTimeout(timer);
      };
    }

    setDetected(false);
  }, []);

  return detected;
}
