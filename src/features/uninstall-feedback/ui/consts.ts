import type { FormState, ReasonKey } from './types';

export const REASON_KEYS: ReasonKey[] = [
  'tooBuggy',
  'missingFeatures',
  'performance',
  'betterAlternative',
  'noLongerNeeded',
  'other',
];

export const EMPTY: FormState = {
  anonymous: true,
  email: '',
  rating: 0,
  reasons: [],
  whatWentWrong: '',
  howToImprove: '',
};
