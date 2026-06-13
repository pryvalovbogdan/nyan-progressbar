import { locales } from '@/i18n';
import type { MetadataRoute } from 'next';

import { HOW_TO_ARTICLE_SLUGS } from '@entities/how-to-article';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nyanprogressbar.com';

const HOW_TO_ROUTES = HOW_TO_ARTICLE_SLUGS.map(slug => `/how-to-use/${slug}` as const);

const ROUTES = [
  '',
  '/extension',
  '/customizer',
  '/reviews',
  '/trending',
  '/support',
  '/contact',
  '/how-to-use',
  ...HOW_TO_ROUTES,
] as const;

const PRIORITY: Record<string, number> = {
  '': 1.0,
  '/extension': 0.9,
  '/customizer': 0.9,
  '/reviews': 0.8,
  '/trending': 0.8,
  '/support': 0.7,
  '/contact': 0.6,
  '/how-to-use': 0.8,
};

const CHANGE_FREQ: Record<string, MetadataRoute.Sitemap[number]['changeFrequency']> = {
  '': 'weekly',
  '/extension': 'monthly',
  '/customizer': 'monthly',
  '/reviews': 'weekly',
  '/trending': 'weekly',
  '/support': 'monthly',
  '/contact': 'monthly',
  '/how-to-use': 'monthly',
};

const HOW_TO_DEFAULT_PRIORITY = 0.7;
const HOW_TO_DEFAULT_FREQ: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly';

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap(route =>
    locales.map(locale => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: CHANGE_FREQ[route] ?? HOW_TO_DEFAULT_FREQ,
      priority: PRIORITY[route] ?? HOW_TO_DEFAULT_PRIORITY,
      alternates: {
        languages: Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}${route}`])),
      },
    })),
  );
}
