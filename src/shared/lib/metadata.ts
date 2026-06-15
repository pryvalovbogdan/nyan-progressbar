import type { Dictionary, Locale } from '@/i18n';
import { locales } from '@/i18n';
import type { Metadata } from 'next';

export type PageKey =
  | 'home'
  | 'extension'
  | 'support'
  | 'contact'
  | 'uninstall'
  | 'reviews'
  | 'customizer'
  | 'privacy'
  | 'howToUse'
  | 'trending';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? '';

const ROUTE: Record<PageKey, string> = {
  home: '',
  extension: '/extension',
  support: '/support',
  contact: '/contact',
  uninstall: '/contact/uninstall',
  reviews: '/reviews',
  customizer: '/customizer',
  privacy: '/privacy',
  howToUse: '/how-to-use',
  trending: '/trending',
};

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  pt: 'pt_BR',
  fr: 'fr_FR',
  de: 'de_DE',
  uk: 'uk_UA',
  pl: 'pl_PL',
  vi: 'vi_VN',
  id: 'id_ID',
  tl: 'tl_PH',
};

interface IGeneratePageMetadataOverrides {
  title?: string;
  description?: string;
  route?: string;
  ogType?: 'website' | 'article';
}

export function generatePageMetadata(
  lang: Locale,
  dict: Dictionary,
  page: PageKey,
  overrides?: IGeneratePageMetadataOverrides,
): Metadata {
  const pageMeta = dict.metadata[page];
  const title = overrides?.title ?? pageMeta.title;
  const description =
    overrides?.description ?? ('description' in pageMeta ? pageMeta.description : dict.metadata.home.description);
  const route = overrides?.route ?? ROUTE[page];
  const ogType = overrides?.ogType ?? 'website';

  const pageUrl = `${SITE_URL}/${lang}${route}`;

  const alternateLanguages = Object.fromEntries(locales.map(locale => [`${locale}`, `${SITE_URL}/${locale}${route}`]));

  const alternateLocales = locales.filter(l => l !== lang).map(l => OG_LOCALE[l]);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Nyan Progress Bar',
      locale: OG_LOCALE[lang],
      alternateLocale: alternateLocales,
      type: ogType,
      images: [{ url: '/catty.png', width: 264, height: 160, alt: 'Nyan Progress Bar' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/catty.png'],
    },
  };
}
