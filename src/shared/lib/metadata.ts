import type { Metadata } from 'next';
import type { Dictionary, Locale } from '@/i18n';
import { locales } from '@/i18n';

export type PageKey = 'home' | 'extension' | 'support' | 'contact' | 'reviews';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nyanprogressbar.com';

const ROUTE: Record<PageKey, string> = {
  home: '',
  extension: '/extension',
  support: '/support',
  contact: '/contact',
  reviews: '/reviews',
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

export function generatePageMetadata(lang: Locale, dict: Dictionary, page: PageKey): Metadata {
  const pageMeta = dict.metadata[page];
  const title = pageMeta.title;
  const description = 'description' in pageMeta ? pageMeta.description : dict.metadata.home.description;

  const pageUrl = `${SITE_URL}/${lang}${ROUTE[page]}`;

  const alternateLanguages = Object.fromEntries(
    locales.map(locale => [`${locale}`, `${SITE_URL}/${locale}${ROUTE[page]}`]),
  );

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
      type: 'website',
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
