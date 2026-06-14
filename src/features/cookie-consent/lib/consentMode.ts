import type { ConsentChoices } from '../model/types';
import { ConsentSignal, ConsentValue } from './types';

export const CONSENT_STORAGE_KEY = 'np-cookie-consent';

function toSignal({ analytics, marketing }: ConsentChoices): ConsentSignal {
  const granted = (v: boolean): ConsentValue => (v ? 'granted' : 'denied');

  return {
    analytics_storage: granted(analytics),
    ad_storage: granted(marketing),
    ad_user_data: granted(marketing),
    ad_personalization: granted(marketing),
    personalization_storage: granted(marketing),
    functionality_storage: 'granted',
    security_storage: 'granted',
  };
}

export function updateConsent(choices: ConsentChoices): void {
  if (typeof window === 'undefined') return;

  const signal = toSignal(choices);

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(['consent', 'update', signal]);
  window.gtag?.('consent' as 'event', 'update' as string, signal as unknown as Record<string, unknown>);
}

export function buildDefaultConsentScript(storageKey: string): string {
  return `
(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;

  var defaults = {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    personalization_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  };

  try {
    var raw = localStorage.getItem(${JSON.stringify(storageKey)});
    if (raw) {
      var stored = JSON.parse(raw);
      if (stored && stored.status && stored.status !== 'unset') {
        var a = stored.analytics ? 'granted' : 'denied';
        var m = stored.marketing ? 'granted' : 'denied';
        defaults.analytics_storage = a;
        defaults.ad_storage = m;
        defaults.ad_user_data = m;
        defaults.ad_personalization = m;
        defaults.personalization_storage = m;
      }
    }
  } catch (e) {}

  gtag('consent', 'default', defaults);
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);
})();
`;
}
