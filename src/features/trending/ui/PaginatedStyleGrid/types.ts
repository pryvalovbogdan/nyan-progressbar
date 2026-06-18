import type { Dictionary } from '@/i18n';

import type { ITrendingStyle } from '@entities/trending-style';

export interface IPaginatedStyleGridProps {
  dict: Dictionary;
  lang: string;
  styles: ITrendingStyle[];
}
