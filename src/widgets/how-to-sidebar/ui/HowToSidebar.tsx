import Link from 'next/link';

import { HOW_TO_ARTICLE_SLUGS } from '@entities/how-to-article';

import type { IHowToSidebarProps } from './types';

export function HowToSidebar({ dict, lang, currentSlug }: IHowToSidebarProps) {
  const h = dict.howToUse;

  return (
    <aside className="lg:sticky lg:top-20 lg:self-start">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">{h.sidebarHeading}</h2>
      <nav>
        <ul className="space-y-1">
          {HOW_TO_ARTICLE_SLUGS.map(slug => {
            const isActive = slug === currentSlug;
            const article = h.articles[slug];

            return (
              <li key={slug}>
                <Link
                  href={`/${lang}/how-to-use/${slug}`}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? 'bg-[#80deea]/20 text-[#80deea] font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {article.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
