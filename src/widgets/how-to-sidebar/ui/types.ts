import type { Dictionary } from '@/i18n';

import type { HowToArticleSlug } from '@entities/how-to-article';

export interface IHowToSidebarProps {
  dict: Dictionary;
  lang: string;
  currentSlug?: HowToArticleSlug;
}
