import { ReleaseReviewCard } from '../ReleaseReviewCard';
import { RELEASE_REVIEWS, RELEASE_VERSION } from '../consts';
import type { IReleaseReviewsSectionProps } from './types';

export function ReleaseReviewsSection({ labels }: IReleaseReviewsSectionProps) {
  return (
    <section className="space-y-5 mb-2">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold">{labels.heading}</h2>
          <span className="rounded border border-[#80deea]/40 bg-[#80deea]/15 px-2 py-0.5 font-mono text-sm font-semibold text-[#80deea]">
            v{RELEASE_VERSION}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{labels.subheading}</p>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0 ml-1 p-1">
        {RELEASE_REVIEWS.map(review => (
          <div key={`${review.name}-${review.date}`} className="w-[280px] shrink-0 snap-start">
            <ReleaseReviewCard review={review} version={RELEASE_VERSION} />
          </div>
        ))}
      </div>
    </section>
  );
}
