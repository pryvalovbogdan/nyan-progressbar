'use client';

import { useConsentStore } from '../model/consentStore';
import type { IOpenCookieSettingsProps } from './types';

export function OpenCookieSettings({ label }: IOpenCookieSettingsProps) {
  const reopen = useConsentStore(s => s.reopen);

  return (
    <button type="button" onClick={reopen} className="hover:text-[#80deea] transition-colors">
      {label}
    </button>
  );
}
