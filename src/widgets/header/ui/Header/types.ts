import type { Locale } from '@/i18n';

import type { NavLabels } from '../types';

export interface IHeaderProps {
  logoAlt: string;
  navLabels: NavLabels;
  lang: Locale;
}
