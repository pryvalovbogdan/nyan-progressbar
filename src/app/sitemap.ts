import { locales } from '@/i18n';
import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nyanprogressbar.com';

const ROUTES = ['', '/extension', '/customizer', '/reviews', '/support', '/contact'] as const;

const PRIORITY: Record<string, number> = {
  '': 1.0,
  '/extension': 0.9,
  '/customizer': 0.9,
  '/reviews': 0.8,
  '/support': 0.7,
  '/contact': 0.6,
};

const CHANGE_FREQ: Record<string, MetadataRoute.Sitemap[number]['changeFrequency']> = {
  '': 'weekly',
  '/extension': 'monthly',
  '/customizer': 'monthly',
  '/reviews': 'weekly',
  '/support': 'monthly',
  '/contact': 'monthly',
};

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap(route =>
    locales.map(locale => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: CHANGE_FREQ[route],
      priority: PRIORITY[route],
      alternates: {
        languages: Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}${route}`])),
      },
    })),
  );
}
