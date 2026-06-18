import Link from 'next/link';

import { PaginatedStyleGrid } from '../PaginatedStyleGrid';
import { TrendingCard } from '../TrendingCard';
import { TrendingCollectionCard } from '../TrendingCollectionCard';
import type { ITrendingSectionProps } from './types';

export function TrendingSection({ dict, lang, section }: ITrendingSectionProps) {
  const t = dict.trending;
  const meta = t.sections[section.id];
  const isPaginated = section.paginated && section.styles && section.styles.length > 0;

  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{meta.title}</h2>
          <p className="text-muted-foreground text-sm">{meta.description}</p>
        </div>
        <Link href={`/${lang}/customizer`} className="text-sm text-[#80deea] font-medium hover:underline">
          {t.seeMore} →
        </Link>
      </div>

      {isPaginated ? (
        <PaginatedStyleGrid dict={dict} lang={lang} styles={section.styles!} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {section.styles?.map(style => (
            <TrendingCard key={style.id} dict={dict} lang={lang} style={style} />
          ))}
          {section.collections?.map(collection => (
            <TrendingCollectionCard key={collection.id} dict={dict} lang={lang} collection={collection} />
          ))}
        </div>
      )}
    </section>
  );
}
