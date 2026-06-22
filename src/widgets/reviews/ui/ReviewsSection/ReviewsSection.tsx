'use client';

import { useState } from 'react';

import { cn } from '@shared/lib/utils';

import { ReviewCard } from '../ReviewCard';
import { Stars } from '../Stars';
import { AVERAGE, DISTRIBUTION, REVIEWS, STORE_URL, TOTAL } from '../consts';
import type { IReviewsSectionProps } from './types';

export function ReviewsSection({ labels }: IReviewsSectionProps) {
  const [expanded, setExpanded] = useState(false);

  const openReviews = () => window.open(STORE_URL, '_blank');

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">{labels.heading}</h2>

        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-rainbow-h btn-press inline-flex text-black items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-[1.03] hover:shadow-[0_4px_20px_rgba(128,222,234,0.35)] shrink-0 min-w-[200px]"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {labels.rateUs}
        </a>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
        <div className="flex flex-col items-center sm:items-start gap-3 sm:min-w-[140px]">
          <div className="text-6xl font-bold text-foreground leading-none">{AVERAGE}</div>
          <Stars rating={Math.round(AVERAGE)} size="md" />
          <p className="text-sm text-muted-foreground">
            {TOTAL} {labels.reviews}
          </p>
        </div>

        <div className="flex flex-col gap-1.5 flex-1 w-full sm:w-auto">
          {DISTRIBUTION.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-2 cursor-pointer" onClick={openReviews}>
              <span className="text-xs text-muted-foreground w-4 text-right shrink-0">{star}</span>
              <svg viewBox="0 0 24 24" className="w-3 h-3 shrink-0" fill="#FBBC04">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#FBBC04] transition-all duration-500"
                  style={{ width: `${(count / TOTAL) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-4 shrink-0">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REVIEWS.slice(0, 9).map(review => (
          <div key={`${review.name}-${review.date}`} onClick={openReviews} className="cursor-pointer">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-700 ease-in-out !mt-0"
        style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden min-h-0">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {REVIEWS.slice(9).map((review, index) => (
              <div
                key={`${review.name}-${review.date}`}
                onClick={openReviews}
                style={{ transitionDelay: `${index * 40}ms` }}
                className={cn(
                  'cursor-pointer transition-[opacity,transform] duration-500 ease-out',
                  expanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
                )}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setExpanded(prev => !prev)}
          className="btn-press inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#80deea]/40 text-sm font-medium text-[#80deea] hover:bg-[#80deea]/10 hover:border-[#80deea]/70"
        >
          {expanded ? labels.showLess : labels.showMore}
          <svg
            viewBox="0 0 24 24"
            className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
