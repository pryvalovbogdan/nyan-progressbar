import type { Locale } from '@/i18n';

export interface NavLabels {
  home: string;
  extension: string;
  customize: string;
  support: string;
  contact: string;
  reviews: string;
}

export interface INavProps {
  labels: NavLabels;
  lang: string;
}

export interface IMobileNavProps {
  labels: NavLabels;
  lang: string;
}

export interface IHeaderProps {
  logoAlt: string;
  navLabels: NavLabels;
  lang: Locale;
}

export interface ILanguageSelectorProps {
  currentLang: Locale;
}
export interface Heart {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
}

export interface IDonateButtonProps {
  href: string;
  label: string;
  isActive: boolean;
}
