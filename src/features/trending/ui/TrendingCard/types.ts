import type { Dictionary } from '@/i18n';

import type { ITrendingStyle } from '@entities/trending-style';

export interface ITrendingCardProps {
  dict: Dictionary;
  lang: string;
  style: ITrendingStyle;
}
