import Image from 'next/image';
import Link from 'next/link';

import type { ITrendingCollectionCardProps } from './types';

export function TrendingCollectionCard({ dict, lang, collection }: ITrendingCollectionCardProps) {
  const t = dict.trending;
  const title = t.collections[collection.id];
  const itemCountLabel = t.itemCount.replace('{count}', String(collection.itemCount));

  return (
    <Link
      href={`/${lang}/customizer`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-[#80deea]/40 hover:shadow-[0_8px_24px_rgba(128,222,234,0.12)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <Image src={collection.coverImageSrc} alt={title} fill unoptimized className="object-cover" />
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        <h3 className="text-base font-semibold leading-tight group-hover:text-[#80deea] transition-colors">{title}</h3>
        <span className="text-xs text-muted-foreground shrink-0">{itemCountLabel}</span>
      </div>
    </Link>
  );
}
