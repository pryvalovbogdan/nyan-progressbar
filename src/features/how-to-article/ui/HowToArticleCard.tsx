import Link from 'next/link';

import type { IHowToArticleCardProps } from './types';

export function HowToArticleCard({ dict, lang, slug }: IHowToArticleCardProps) {
  const article = dict.howToUse.articles[slug];

  return (
    <Link
      href={`/${lang}/how-to-use/${slug}`}
      className="group block rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#80deea]/40 hover:shadow-[0_8px_24px_rgba(128,222,234,0.12)]"
    >
      <h3 className="text-lg font-semibold mb-2 group-hover:text-[#80deea] transition-colors">{article.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{article.summary}</p>
      <span className="text-sm text-[#80deea] font-medium">{dict.howToUse.index.readMore} →</span>
    </Link>
  );
}
