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
