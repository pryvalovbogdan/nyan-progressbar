import type { HowToArticleSlug } from './types';

export const HOW_TO_ARTICLE_SLUGS: readonly HowToArticleSlug[] = [
  'install',
  'choose-cat',
  'upload-gif',
  'adjust-position',
];

export function isHowToArticleSlug(v: unknown): v is HowToArticleSlug {
  return typeof v === 'string' && (HOW_TO_ARTICLE_SLUGS as readonly string[]).includes(v);
}

export const HOW_TO_ARTICLE_VIDEO_IDS: Record<HowToArticleSlug, string | null> = {
  install: 'Ufzk5xf8Rho',
  'choose-cat': null,
  'upload-gif': 'zsZ1h6_vTVg',
  'adjust-position': null,
};

export function getHowToArticleStepImage(slug: HowToArticleSlug, stepIndex: number): string {
  return `/how-to-use/${slug}-${stepIndex + 1}.png`;
}
