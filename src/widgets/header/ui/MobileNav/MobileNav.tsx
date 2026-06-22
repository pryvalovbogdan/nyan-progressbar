'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useHeartAnimation } from '@shared/hooks/useHeartAnimation';

import type { IMobileNavProps } from './types';

export function MobileNav({ labels, lang }: IMobileNavProps) {
  const [open, setOpen] = useState(false);
  const { hearts, spawnHearts, removeHeart } = useHeartAnimation();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { href: `/${lang}`, label: labels.home },
    { href: `/${lang}/extension`, label: labels.extension },
    { href: `/${lang}/trending`, label: labels.trending },
    { href: `/${lang}/how-to-use`, label: labels.howToUse },
    { href: `/${lang}/customizer`, label: labels.customize },
    { href: `/${lang}/blog`, label: labels.blog },
    { href: `/${lang}/reviews`, label: labels.reviews },
    { href: `/${lang}/support`, label: labels.support },
    { href: `/${lang}/contact`, label: labels.contact },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute transition-all duration-200 ${open ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute transition-all duration-200 ${open ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div className="fixed top-14 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md animate-in slide-in-from-top-2 fade-in-0 duration-200">
          <nav className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-0.5">
            {links.map(({ href, label }) => {
              const isDonate = href === `/${lang}/support`;

              if (isDonate) {
                return (
                  <Link
                    key={href}
                    href={href}
                    onMouseEnter={spawnHearts}
                    onTouchStart={spawnHearts}
                    className="gradient-heart-dim relative flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold text-white transition-colors overflow-visible"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    {label}
                    {hearts.map(heart => (
                      <svg
                        key={heart.id}
                        viewBox="0 0 24 24"
                        fill={heart.color}
                        className="donate-heart absolute"
                        onAnimationEnd={() => removeHeart(heart.id)}
                        style={
                          {
                            left: `calc(50% + ${heart.x}px)`,
                            width: heart.size,
                            height: heart.size,
                            color: heart.color,
                            '--heart-delay': `${heart.delay}ms`,
                            '--heart-duration': `${heart.duration}ms`,
                            '--heart-rotate': `${heart.rotate}deg`,
                          } as React.CSSProperties
                        }
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ))}
                  </Link>
                );
              }

              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === href ? 'bg-[#80deea]/10 text-[#80deea]' : 'text-foreground hover:bg-accent'
                  }`}
                >
                  {pathname === href && <span className="w-1.5 h-1.5 rounded-full bg-[#80deea] shrink-0" />}
                  <span className={pathname === href ? '' : 'ml-[18px]'}>{label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="h-safe-area-inset-bottom" />
        </div>
      )}
    </>
  );
}
