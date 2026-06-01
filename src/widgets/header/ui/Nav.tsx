'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

export function Nav({ labels, lang }: Props) {
  const pathname = usePathname();

  const links = [
    { href: `/${lang}`, label: labels.home },
    { href: `/${lang}/extension`, label: labels.extension },
    { href: `/${lang}/support`, label: labels.support },
    { href: `/${lang}/contact`, label: labels.contact },
  ];

  return (
    <nav className="flex gap-1">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            pathname === href
              ? 'bg-[#80deea]/20 text-[#80deea]'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
