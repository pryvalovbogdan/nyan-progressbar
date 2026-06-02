'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Review, Props } from './types';
import { STORE_URL, TOTAL, AVERAGE, REVIEWS, DISTRIBUTION } from './consts';

function Stars({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-6 h-6' };
  const cls = sizes[size];

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={cls}
          fill={i <= rating ? '#FBBC04' : 'none'}
          stroke="#FBBC04"
          strokeWidth="1.5"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, className = '' }: { review: Review; className?: string }) {
  return (
    <div
      className={`flex flex-col gap-3 p-5 rounded-2xl border border-border bg-card hover:border-[#80deea]/30 hover:shadow-[0_4px_16px_rgba(128,222,234,0.08)] transition-all duration-300 ${className}`}
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

export function ReviewsSection({ labels }: Props) {
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
          className="inline-flex text-black items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_4px_20px_rgba(128,222,234,0.35)] active:scale-[0.97] shrink-0 min-w-[200px]"
          style={{
            background: 'linear-gradient(90deg, #ff0000, #ff7700, #ffff00, #00cc44, #0066ff, #8b00ff)',
          }}
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
                style={{
                  opacity: expanded ? 1 : 0,
                  transform: expanded ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 500ms ${index * 40}ms ease, transform 500ms ${index * 40}ms ease`,
                }}
                className="cursor-pointer"
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
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#80deea]/40 text-sm font-medium text-[#80deea] hover:bg-[#80deea]/10 hover:border-[#80deea]/70 transition-all duration-200 active:scale-[0.97]"
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
