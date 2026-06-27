import type { FormState, ReasonKey } from './UninstallFeedbackForm/types';

export const REASON_KEYS: ReasonKey[] = [
  'tooBuggy',
  'missingFeatures',
  'performance',
  'betterAlternative',
  'noLongerNeeded',
  'other',
];

export const EMPTY: FormState = {
  email: '',
  rating: 0,
  reasons: [],
  whatWentWrong: '',
  howToImprove: '',
  attachments: [],
};

export const MAX_SIZE = 5 * 1024 * 1024;
export const MAX_FILES = 3;
