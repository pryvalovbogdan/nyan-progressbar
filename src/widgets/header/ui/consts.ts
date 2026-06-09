import type { Locale } from '@/i18n';

export const LANG_META: Record<Locale, { flag: string; label: string }> = {
  en: { flag: '🇺🇸', label: 'English' },
  es: { flag: '🇪🇸', label: 'Español' },
  pt: { flag: '🇧🇷', label: 'Português' },
  vi: { flag: '🇻🇳', label: 'Tiếng Việt' },
  id: { flag: '🇮🇩', label: 'Bahasa Indonesia' },
  fr: { flag: '🇫🇷', label: 'Français' },
  tl: { flag: '🇵🇭', label: 'Filipino' },
  pl: { flag: '🇵🇱', label: 'Polski' },
  de: { flag: '🇩🇪', label: 'Deutsch' },
  uk: { flag: '🇺🇦', label: 'Українська' },
};
