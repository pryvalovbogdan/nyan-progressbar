import type { Dictionary } from '@/i18n';

import type { ITrendingCollection, ITrendingSection, ITrendingStyle } from '@entities/trending-style';

export interface ITrendingCardProps {
  dict: Dictionary;
  lang: string;
  style: ITrendingStyle;
}

export interface ITrendingCollectionCardProps {
  dict: Dictionary;
  lang: string;
  collection: ITrendingCollection;
}

export interface ITrendingSectionProps {
  dict: Dictionary;
  lang: string;
  section: ITrendingSection;
}

export interface IPaginatedStyleGridProps {
  dict: Dictionary;
  lang: string;
  styles: ITrendingStyle[];
}
