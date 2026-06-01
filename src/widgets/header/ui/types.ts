import type { Locale } from '@shared/dictionaries';

export interface NavLabels {
  home: string;
  extension: string;
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
