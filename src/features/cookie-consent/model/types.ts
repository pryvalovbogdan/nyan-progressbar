export type ConsentStatus = 'unset' | 'accepted' | 'rejected' | 'custom';

export interface ConsentChoices {
  analytics: boolean;
  marketing: boolean;
}

export interface StoredConsent extends ConsentChoices {
  status: Exclude<ConsentStatus, 'unset'>;
}

export interface ConsentStore {
  status: ConsentStatus;
  analytics: boolean;
  marketing: boolean;
  hydrated: boolean;
  hydrate: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (choices: { analytics: boolean; marketing: boolean }) => void;
  reopen: () => void;
}
