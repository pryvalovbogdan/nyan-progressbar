import type { Dictionary } from '@/i18n';

import type { HowToArticleSlug } from '@entities/how-to-article';

export interface IHowToArticleBodyProps {
  dict: Dictionary;
  lang: string;
  slug: HowToArticleSlug;
}

export interface IHowToArticleCardProps {
  dict: Dictionary;
  lang: string;
  slug: HowToArticleSlug;
}
