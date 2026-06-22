import Image from 'next/image';

import { Stars } from '@widgets/reviews';
import { STORE_URL } from '@widgets/reviews/ui/consts';

import type { IReleaseReviewCardProps } from './types';

export function ReleaseReviewCard({ review, version }: IReleaseReviewCardProps) {
  return (
    <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="block h-full">
      <article className="cursor-pointer relative flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#80deea]/40 hover:shadow-[0_8px_24px_rgba(128,222,234,0.18)]">
        <div
          aria-hidden="true"
          className="gradient-rainbow-diag pointer-events-none absolute inset-x-0 -top-[1px] h-[2px] rounded-t-2xl mx-[7px]"
        />

        <header className="flex items-center gap-3">
          <div className="gradient-rainbow-diag relative h-12 w-12 shrink-0 rounded-full p-[2px]">
            <div className="h-full w-full overflow-hidden rounded-full bg-card">
              <Image
                src={review.avatar}
                alt={review.name}
                width={44}
                height={44}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{review.name}</p>
            <Stars rating={review.rating} size="sm" />
          </div>
        </header>

        <p className="text-sm italic leading-relaxed text-muted-foreground">&ldquo;{review.comment}&rdquo;</p>

        <footer className="mt-auto flex items-center justify-between pt-1">
          <time className="text-xs text-muted-foreground">{review.date}</time>
          <span className="rounded-full border border-[#80deea]/40 bg-[#80deea]/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#80deea]">
            v{version}
          </span>
        </footer>
      </article>
    </a>
  );
}
