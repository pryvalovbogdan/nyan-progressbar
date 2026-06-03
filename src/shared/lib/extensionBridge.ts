const isDev = process.env.NODE_ENV === 'development';
const EXTENSION_ID = isDev ? process.env.NEXT_PUBLIC_LOCAL_EXTENSION_ID : process.env.NEXT_PUBLIC_PROD_EXTENSION_ID;

export function sendToExtension(action: string, payload: Record<string, unknown>): void {
  chrome.runtime.sendMessage(EXTENSION_ID!, { action, ...payload });
}

export interface ExtensionState {
  selectedCat: string | null;
  customUserCat: string | null;
  customCatStyles: { height: number; top: number } | null;
}

export function getExtensionState(): Promise<ExtensionState> {
  return new Promise(resolve => {
    chrome.runtime.sendMessage(EXTENSION_ID!, { action: 'GET_STATE' }, (response: ExtensionState) => {
      console.log('response', response);
      resolve(response ?? { selectedCat: null, customUserCat: null });
    });
  });
}
