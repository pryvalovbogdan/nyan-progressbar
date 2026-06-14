export interface CookieConsentLabels {
  title: string;
  description: string;
  policyLink: string;
  acceptAll: string;
  rejectAll: string;
  managePreferences: string;
  savePreferences: string;
  back: string;
  close: string;
  categories: {
    necessary: {
      title: string;
      description: string;
      alwaysOn: string;
    };
    analytics: {
      title: string;
      description: string;
    };
    marketing: {
      title: string;
      description: string;
    };
  };
}

export interface ICookieBannerProps {
  labels: CookieConsentLabels;
  privacyHref: string;
}

export interface ICookieToggleProps {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  badge?: string;
  onChange?: (next: boolean) => void;
}

export interface IOpenCookieSettingsProps {
  label: string;
}

export interface IConsentDefaultScriptProps {
  storageKey: string;
}
