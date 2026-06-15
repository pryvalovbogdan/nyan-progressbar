export type ReasonKey =
  | 'tooBuggy'
  | 'missingFeatures'
  | 'performance'
  | 'betterAlternative'
  | 'noLongerNeeded'
  | 'other';

export interface FormTranslations {
  modeAnonymous: string;
  modeAnonymousDesc: string;
  modeEmail: string;
  modeEmailDesc: string;
  email: string;
  emailPlaceholder: string;
  ratingLabel: string;
  ratingHint: string;
  reasonsLabel: string;
  reasons: Record<ReasonKey, string>;
  whatWentWrong: string;
  whatWentWrongPlaceholder: string;
  howToImprove: string;
  howToImprovePlaceholder: string;
  submit: string;
  submitting: string;
  success: string;
  errorEmpty: string;
  errorGeneric: string;
  errorRateLimit: string;
}

export interface FormState {
  anonymous: boolean;
  email: string;
  rating: number;
  reasons: ReasonKey[];
  whatWentWrong: string;
  howToImprove: string;
}

export interface IUninstallFeedbackFormProps {
  t: FormTranslations;
}
