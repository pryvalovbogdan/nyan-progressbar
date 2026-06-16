export type AdSlotName = 'homeMid' | 'homeFooter' | 'extension' | 'howToArticle' | 'faq' | 'trending';

export const AD_SLOTS: Record<AdSlotName, string> = {
  homeMid: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_MID ?? '',
  homeFooter: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_FOOTER ?? '',
  extension: process.env.NEXT_PUBLIC_ADSENSE_SLOT_EXTENSION ?? '',
  howToArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOW_TO_ARTICLE ?? '',
  faq: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FAQ ?? '',
  trending: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TRENDING ?? '',
};
