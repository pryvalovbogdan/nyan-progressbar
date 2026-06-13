import type { Dictionary } from '@/i18n';

import { TRENDING_SECTIONS } from '@entities/trending-style';
import { TrendingSection } from '@features/trending';
import { buttonVariants } from '@shared/ui/button';
import { Separator } from '@shared/ui/separator';

interface ITrendingViewProps {
  dict: Dictionary;
  lang: string;
}

export function TrendingView({ dict, lang }: ITrendingViewProps) {
  const t = dict.trending;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-16 space-y-12 sm:space-y-20">
      <header className="space-y-3">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{t.heading}</h1>
        <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl">{t.description}</p>
      </header>

      {TRENDING_SECTIONS.map(section => (
        <TrendingSection key={section.id} section={section} dict={dict} lang={lang} />
      ))}

      <Separator />

      <section className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">{t.installHeading}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{t.installDescription}</p>
        <a
          href={`https://chromewebstore.google.com/detail/nyan-cat-extension/${process.env.NEXT_PUBLIC_PROD_EXTENSION_ID}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            size: 'lg',
            className: 'bg-[#80deea] text-background font-semibold hover:bg-[#80deea]/90',
          })}
        >
          {t.installCta}
        </a>
      </section>
    </div>
  );
}
