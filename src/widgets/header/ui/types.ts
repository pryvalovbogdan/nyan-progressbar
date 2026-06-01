import type { Locale } from '@/i18n';

export interface NavLabels {
  home: string;
  extension: string;
  customize: string;
  support: string;
  contact: string;
  reviews: string;
}

export interface NavProps {
  labels: NavLabels;
  lang: string;
}

export interface MobileNavProps {
  labels: NavLabels;
  lang: string;
}

export interface HeaderProps {
  logoAlt: string;
  navLabels: NavLabels;
  lang: Locale;
}
