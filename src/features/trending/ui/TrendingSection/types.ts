import type { Dictionary } from '@/i18n';

import type { ITrendingSection } from '@entities/trending-style';

export interface ITrendingSectionProps {
  dict: Dictionary;
  lang: string;
  section: ITrendingSection;
}
