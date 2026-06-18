import Image from 'next/image';
import Link from 'next/link';

import { LanguageSelector } from '../LanguageSelector';
import { MobileNav } from '../MobileNav';
import { Nav } from '../Nav';
import { ThemeToggle } from '../ThemeToggle';
import type { IHeaderProps } from './types';

export function Header({ logoAlt, navLabels, lang }: IHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between gap-2">
        <Link href={`/${lang}`} className="flex items-center gap-2 font-bold shrink-0">
          <Image src="/cats/catty.gif" alt={logoAlt} width={24} height={24} unoptimized />
          <span className="text-[#80deea] text-base sm:text-lg leading-none">Nyan Progress Bar</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="hidden md:block">
            <Nav labels={navLabels} lang={lang} />
          </nav>

          <LanguageSelector currentLang={lang} />
          <ThemeToggle />
          <div className="md:hidden">
            <MobileNav labels={navLabels} lang={lang} />
          </div>
        </div>
      </div>
    </header>
  );
}
