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

export interface IStepImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority: boolean;
}
