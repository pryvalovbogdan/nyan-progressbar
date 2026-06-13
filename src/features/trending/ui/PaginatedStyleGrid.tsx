'use client';

import { useState } from 'react';

import { TrendingCard } from './TrendingCard';
import { PAGINATED_PAGE_SIZE } from './consts';
import type { IPaginatedStyleGridProps } from './types';

export function PaginatedStyleGrid({ dict, lang, styles }: IPaginatedStyleGridProps) {
  const [page, setPage] = useState(0);
  const t = dict.trending;
  const totalPages = Math.max(1, Math.ceil(styles.length / PAGINATED_PAGE_SIZE));
  const start = page * PAGINATED_PAGE_SIZE;
  const visible = styles.slice(start, start + PAGINATED_PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {visible.map(style => (
          <TrendingCard key={style.id} dict={dict} lang={lang} style={style} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-3 py-2 rounded-md border border-border text-sm font-medium text-foreground transition-colors hover:border-[#80deea]/40 hover:text-[#80deea] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-foreground"
          >
            ← {t.pagination.previous}
          </button>
          <span className="text-sm text-muted-foreground tabular-nums">
            {page + 1} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="px-3 py-2 rounded-md border border-border text-sm font-medium text-foreground transition-colors hover:border-[#80deea]/40 hover:text-[#80deea] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-foreground"
          >
            {t.pagination.next} →
          </button>
        </div>
      )}
    </div>
  );
}
