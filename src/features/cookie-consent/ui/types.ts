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
