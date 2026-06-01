import type { ElementType } from 'react';

export interface FormTranslations {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  category: string;
  categoryPlaceholder: string;
  categoryBug: string;
  categoryBugDesc: string;
  categoryFeature: string;
  categoryFeatureDesc: string;
  categoryQuestion: string;
  categoryQuestionDesc: string;
  message: string;
  messagePlaceholder: string;
  screenshotLabel: string;
  screenshotOptional: string;
  screenshotErrorType: string;
  screenshotErrorSize: string;
  screenshotRemove: string;
  screenshotDrop: string;
  screenshotAttach: string;
  screenshotHint: string;
  submit: string;
  submitting: string;
  errorEmpty: string;
  errorGeneric: string;
  errorRateLimit: string;
  success: string;
}

export interface Attachment {
  name: string;
  data: string;
  mimeType: string;
  size: number;
  preview: string;
}

export interface FormState {
  name: string;
  email: string;
  category: string | null;
  message: string;
  attachment: Attachment | null;
}

export interface CategoryCard {
  value: string;
  icon: ElementType;
  label: string;
  description: string;
  iconColor: string;
  iconBg: string;
  selectedBorder: string;
  selectedShadow: string;
}

export interface Props {
  t: FormTranslations;
}
