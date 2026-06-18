import type { Dictionary } from '@/i18n';

import type { ITrendingCollection } from '@entities/trending-style';

export interface ITrendingCollectionCardProps {
  dict: Dictionary;
  lang: string;
  collection: ITrendingCollection;
}
