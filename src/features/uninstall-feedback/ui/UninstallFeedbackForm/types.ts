export type ReasonKey =
  | 'tooBuggy'
  | 'missingFeatures'
  | 'performance'
  | 'betterAlternative'
  | 'noLongerNeeded'
  | 'other';

export interface FormTranslations {
  email: string;
  emailPlaceholder: string;
  ratingLabel: string;
  ratingHint: string;
  reasonsLabel: string;
  reasons: Record<ReasonKey, string>;
  whatWentWrong: string;
  whatWentWrongPlaceholder: string;
  screenshotLabel: string;
  screenshotOptional: string;
  screenshotRequired: string;
  screenshotErrorType: string;
  screenshotErrorSize: string;
  screenshotErrorMax: string;
  screenshotRemove: string;
  screenshotDrop: string;
  screenshotAttach: string;
  screenshotHint: string;
  howToImprove: string;
  howToImprovePlaceholder: string;
  submit: string;
  submitting: string;
  success: string;
  errorEmpty: string;
  errorEmail: string;
  errorScreenshot: string;
  errorGeneric: string;
  errorRateLimit: string;
}

export interface Attachment {
  name: string;
  data: string;
  mimeType: string;
  size: number;
  preview: string;
}

export interface FormState {
  email: string;
  rating: number;
  reasons: ReasonKey[];
  whatWentWrong: string;
  howToImprove: string;
  attachments: Attachment[];
}

export interface IUninstallFeedbackFormProps {
  t: FormTranslations;
}
