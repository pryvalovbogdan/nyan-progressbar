import Image from 'next/image';

import { Stars } from '../Stars';
import type { IReviewCardProps } from './types';

export function ReviewCard({ review, className = '' }: IReviewCardProps) {
  return (
    <div
      className={`flex flex-col gap-3 p-5 rounded-2xl border border-border bg-card hover:border-[#80deea]/30 hover:shadow-[0_4px_16px_rgba(128,222,234,0.08)] hover:scale-[1.02] transition-all duration-300 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 shrink-0">
          <Image src={review.avatar} alt={review.name} width={40} height={40} className="rounded-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.date}</p>
        </div>
      </div>

      <Stars rating={review.rating} size="sm" />

      <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
    </div>
  );
}
