'use client';

const isDev = process.env.NODE_ENV === 'development';
const CHROME_EXTENSION_ID = isDev
  ? process.env.NEXT_PUBLIC_LOCAL_EXTENSION_ID
  : process.env.NEXT_PUBLIC_PROD_EXTENSION_ID;

export interface ExtensionState {
  selectedCat: string | null;
  customUserCat: string | null;
  customCatStyles: { height: number; top: number } | null;
}

const isSafariBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;

  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

/**
 * Sends an action and payload to the extension
 */
export function sendToExtension(action: string, payload: Record<string, unknown>): void {
  if (isSafariBrowser()) {
    window.postMessage(
      {
        source: 'WEB_PAGE',
        target: 'SAFARI_EXTENSION_CONTENT_SCRIPT',
        action,
        ...payload,
      },
      '*',
    );
  } else {
    if (CHROME_EXTENSION_ID) {
      chrome.runtime.sendMessage(CHROME_EXTENSION_ID, { action, ...payload });
    }
  }
}

/**
 * Requests the current state from the extension
 */
export function getExtensionState(): Promise<ExtensionState> {
  const defaultState: ExtensionState = { selectedCat: null, customUserCat: null, customCatStyles: null };

  return new Promise(resolve => {
    if (isSafariBrowser()) {
      const requestId = Math.random().toString(36).substring(2, 9);

      const handleResponse = (event: MessageEvent) => {
        if (event.data && event.data.target === 'WEB_PAGE' && event.data.requestId === requestId) {
          window.removeEventListener('message', handleResponse);
          clearTimeout(timeout);
          resolve(event.data.response ?? defaultState);
        }
      };

      window.addEventListener('message', handleResponse);

      const timeout = setTimeout(() => {
        window.removeEventListener('message', handleResponse);
        resolve(defaultState);
      }, 1000);

      window.postMessage(
        {
          source: 'WEB_PAGE',
          target: 'SAFARI_EXTENSION_CONTENT_SCRIPT',
          action: 'GET_STATE',
          requestId,
        },
        '*',
      );
    } else {
      if (!CHROME_EXTENSION_ID) {
        return resolve(defaultState);
      }

      chrome.runtime.sendMessage(CHROME_EXTENSION_ID, { action: 'GET_STATE' }, (response: ExtensionState) => {
        resolve(response ?? defaultState);
      });
    }
  });
}
