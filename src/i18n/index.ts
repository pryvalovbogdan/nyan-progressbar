import type en from './en.json';

export type Dictionary = typeof en;

export const locales = ['en', 'es', 'pt', 'vi', 'id', 'fr', 'tl', 'pl', 'de', 'uk'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function hasLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./en.json').then(m => m.default),
  es: () => import('./es.json').then(m => m.default),
  pt: () => import('./pt.json').then(m => m.default),
  vi: () => import('./vi.json').then(m => m.default),
  id: () => import('./id.json').then(m => m.default),
  fr: () => import('./fr.json').then(m => m.default),
  tl: () => import('./tl.json').then(m => m.default),
  pl: () => import('./pl.json').then(m => m.default),
  de: () => import('./de.json').then(m => m.default),
  uk: () => import('./uk.json').then(m => m.default),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
