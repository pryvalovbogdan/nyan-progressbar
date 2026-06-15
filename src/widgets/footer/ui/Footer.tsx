import Link from 'next/link';

import { OpenCookieSettings } from '@features/cookie-consent';

import type { IFooterProps } from './types';

export function Footer({ labels, lang }: IFooterProps) {
  const links: { href: string; label: string }[] = [
    { href: `/${lang}/about`, label: labels.about },
    { href: `/${lang}/how-to-use`, label: labels.howToUse },
    { href: `/${lang}/faq`, label: labels.faq },
    { href: `/${lang}/privacy`, label: labels.privacy },
    { href: `/${lang}/terms`, label: labels.terms },
  ];

  return (
    <footer className="border-t border-border mt-12 sm:mt-24 py-6 sm:py-8 text-center text-sm text-muted-foreground">
      <div className="space-y-2">
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>{labels.madeWith}</span>
          <span aria-hidden="true">·</span>
          <a
            href="https://ko-fi.com/nyancustombar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#80deea] transition-colors"
          >
            {labels.support}
          </a>
        </p>
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          {links.map((link, idx) => (
            <span key={link.href} className="flex items-center gap-x-3">
              {idx > 0 && <span aria-hidden="true">·</span>}
              <Link href={link.href} className="hover:text-[#80deea] transition-colors">
                {link.label}
              </Link>
            </span>
          ))}
          <span aria-hidden="true">·</span>
          <OpenCookieSettings label={labels.cookies} />
        </p>
      </div>
    </footer>
  );
}
