'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { trackEvent } from '@shared/lib/analytics';

import { DonateButton } from './DonateButton';
import type { INavProps } from './types';

export function Nav({ labels, lang }: INavProps) {
  const pathname = usePathname();

  const links = [
    { href: `/${lang}`, label: labels.home },
    { href: `/${lang}/extension`, label: labels.extension },
    { href: `/${lang}/how-to-use`, label: labels.howToUse },
    { href: `/${lang}/customizer`, label: labels.customize },
    { href: `/${lang}/reviews`, label: labels.reviews },
    { href: `/${lang}/support`, label: labels.support },
    { href: `/${lang}/contact`, label: labels.contact },
  ];

  return (
    <nav className="flex gap-1 items-center">
      {links.map(({ href, label }) => {
        if (href === `/${lang}/support`) {
          return <DonateButton key={href} href={href} label={label} isActive={pathname === href} />;
        }

        const isCustomize = href === `/${lang}/customizer`;

        return (
          <Link
            key={href}
            href={href}
            onClick={isCustomize ? () => trackEvent('customize_click') : undefined}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              pathname === href
                ? 'bg-[#80deea]/20 text-[#80deea]'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
