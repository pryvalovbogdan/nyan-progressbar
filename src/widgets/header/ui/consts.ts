import type { Locale } from '@/i18n';

export const HEART_COLORS = ['#ff6b8a', '#ff4d4d', '#ff8c42', '#c084fc', '#80deea', '#fbbf24', '#f472b6', '#a78bfa'];

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
