import type { Dictionary } from '@/i18n';

import { buttonVariants } from '@shared/ui/button';
import { Separator } from '@shared/ui/separator';

interface IExtensionViewProps {
  dict: Dictionary;
  locale: string;
}

export function ExtensionView({ dict, locale }: IExtensionViewProps) {
  const e = dict.extension;

  const features = [
    { icon: '⚡', title: e.feature1Title, desc: e.feature1Desc },
    { icon: '🔒', title: e.feature2Title, desc: e.feature2Desc },
    { icon: '🎭', title: e.feature3Title, desc: e.feature3Desc },
    { icon: '📁', title: e.feature4Title, desc: e.feature4Desc },
    { icon: '🎵', title: e.feature5Title, desc: e.feature5Desc },
    { icon: '🌍', title: e.feature6Title, desc: e.feature6Desc },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-16 space-y-10 sm:space-y-16">
      <section className="text-center space-y-4 sm:space-y-6">
        <h1 className="text-4xl font-bold">{e.heading}</h1>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto">{e.description}</p>
        <a
          href="https://chromewebstore.google.com/detail/nyan-cat-extension/oadlabdleegopgjlkcmjjogeaceagbie"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            size: 'lg',
            className: 'bg-[#80deea] text-background font-semibold hover:bg-[#80deea]/90 text-base px-10',
          })}
        >
          {e.cta}
        </a>
        <p className="text-xs text-muted-foreground">{e.specs}</p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">{e.featuresHeading}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-3 p-4 rounded-xl border border-border bg-card">
              <span className="text-2xl shrink-0">{icon}</span>
              <div>
                <h3 className="font-semibold text-sm">{title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      <section className="text-center space-y-3">
        <h2 className="text-xl font-bold">{e.questionHeading}</h2>
        <p className="text-muted-foreground text-sm">
          {e.questionPre}{' '}
          <a href={`/${locale}/contact`} className="text-[#80deea] hover:underline">
            {e.questionLinkText}
          </a>{' '}
          {e.questionPost}
        </p>
      </section>
    </div>
  );
}
