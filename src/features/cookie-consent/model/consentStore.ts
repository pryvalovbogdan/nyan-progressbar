'use client';

import { create } from 'zustand';

import { CONSENT_STORAGE_KEY, updateConsent } from '../lib/consentMode';
import type { ConsentStatus, ConsentStore, StoredConsent } from './types';

function isStoredConsent(value: unknown): value is StoredConsent {
  if (!value || typeof value !== 'object') return false;

  const v = value as Record<string, unknown>;

  return (
    (v.status === 'accepted' || v.status === 'rejected' || v.status === 'custom') &&
    typeof v.analytics === 'boolean' &&
    typeof v.marketing === 'boolean'
  );
}

function persistChoices(status: Exclude<ConsentStatus, 'unset'>, analytics: boolean, marketing: boolean): void {
  try {
    const payload: StoredConsent = { status, analytics, marketing };

    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage may be unavailable (private mode, quota); fail silently
  }
}

export const useConsentStore = create<ConsentStore>((set, get) => ({
  status: 'unset',
  analytics: false,
  marketing: false,
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) return;

    try {
      const raw = localStorage.getItem(CONSENT_STORAGE_KEY);

      if (raw) {
        const parsed: unknown = JSON.parse(raw);

        if (isStoredConsent(parsed)) {
          set({
            status: parsed.status,
            analytics: parsed.analytics,
            marketing: parsed.marketing,
            hydrated: true,
          });

          return;
        }
      }
    } catch {
      // ignore corrupt entry — treat as unset
    }

    set({ hydrated: true });
  },

  acceptAll: () => {
    set({ status: 'accepted', analytics: true, marketing: true });
    persistChoices('accepted', true, true);
    updateConsent({ analytics: true, marketing: true });
  },

  rejectAll: () => {
    set({ status: 'rejected', analytics: false, marketing: false });
    persistChoices('rejected', false, false);
    updateConsent({ analytics: false, marketing: false });
  },

  savePreferences: ({ analytics, marketing }) => {
    set({ status: 'custom', analytics, marketing });
    persistChoices('custom', analytics, marketing);
    updateConsent({ analytics, marketing });
  },

  reopen: () => {
    set({ status: 'unset' });
  },
}));
