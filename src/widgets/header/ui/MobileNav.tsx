'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface NavLabels {
  home: string;
  extension: string;
  support: string;
  contact: string;
}

interface Props {
  labels: NavLabels;
  lang: string;
}

export function MobileNav({ labels, lang }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  const links = [
    { href: `/${lang}`, label: labels.home },
    { href: `/${lang}/extension`, label: labels.extension },
    { href: `/${lang}/support`, label: labels.support },
    { href: `/${lang}/contact`, label: labels.contact },
  ];

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
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
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'bg-[#80deea]/10 text-[#80deea]'
                    : 'text-foreground hover:bg-accent'
                }`}
              >
                {pathname === href && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#80deea] shrink-0" />
                )}
                <span className={pathname === href ? '' : 'ml-[18px]'}>{label}</span>
              </Link>
            ))}
          </nav>
          <div className="h-safe-area-inset-bottom" />
        </div>
      )}
    </>
  );
}
