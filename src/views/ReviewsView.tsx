import type { Dictionary } from '@/i18n';

import { ReviewsSection } from '@widgets/reviews';

interface IReviewsViewProps {
  dict: Dictionary;
}

export function ReviewsView({ dict }: IReviewsViewProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-16">
      <ReviewsSection
        labels={{
          heading: dict.reviews.heading,
          rateUs: dict.reviews.rateUs,
          reviews: dict.reviews.reviews,
          showMore: dict.reviews.showMore,
          showLess: dict.reviews.showLess,
        }}
      />
    </div>
  );
}
