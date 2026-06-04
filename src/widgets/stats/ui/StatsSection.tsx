'use client';

import { useEffect, useRef, useState } from 'react';

import { useCountUp } from '../hooks';
import type { IStatCardProps, IStatsSectionProps } from './types';

function StatCard({ target, unit, label, started, duration }: IStatCardProps) {
  const count = useCountUp(target, started, duration);

  return (
    <div className="flex flex-col items-center gap-2 p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-[#80deea]/40 hover:shadow-[0_4px_24px_rgba(128,222,234,0.12)] transition-all duration-300">
      <span className="text-4xl sm:text-5xl font-bold tabular-nums text-[#80deea] leading-none">
        {count.toLocaleString()}
        {unit}
      </span>
      <span className="text-sm text-muted-foreground text-center leading-tight">{label}</span>
    </div>
  );
}

export function StatsSection({ labels }: IStatsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;

    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const stats = [
    { target: 70, unit: 'K+', label: labels.totalInstalls, duration: 1600 },
    { target: 32, unit: 'K+', label: labels.activeUsers, duration: 1500 },
    { target: 177, unit: '+', label: labels.countries, duration: 1800 },
    { target: 84, unit: '+', label: labels.dailyUsers, duration: 1400 },
    { target: 12, unit: '', label: labels.catThemes, duration: 1000 },
  ];

  return (
    <section ref={sectionRef} className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map(({ target, unit, label, duration }) => (
          <StatCard key={label} target={target} unit={unit} label={label} started={started} duration={duration} />
        ))}
      </div>
    </section>
  );
}
