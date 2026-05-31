import { notFound } from 'next/navigation';
import { ScrubberGallery } from '@/components/scrubber/ScrubberGallery';
import { CustomizerPanel } from '@/components/customizer/CustomizerPanel';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getDictionary, hasLocale } from '@/dictionaries';
import type { Locale } from '@/dictionaries';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const h = dict.home;

  const features = [
    { icon: '🐱', title: h.feature1Title, desc: h.feature1Desc },
    { icon: '🎨', title: h.feature2Title, desc: h.feature2Desc },
    { icon: '🌙', title: h.feature3Title, desc: h.feature3Desc },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-16 space-y-12 sm:space-y-20">
      <section className="text-center space-y-5 sm:space-y-6">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          {h.headingPart1}{' '}
          <span className="text-[#80deea]">{h.headingAccent}</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">{h.description}</p>
        <a
          href="https://chrome.google.com/webstore"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            size: 'lg',
            className: 'bg-[#80deea] text-background font-semibold hover:bg-[#80deea]/90 text-base px-8',
          })}
        >
          {h.cta}
        </a>
      </section>

      <Separator />

      <section className="space-y-6 sm:space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{h.galleryHeading}</h2>
          <p className="text-muted-foreground text-sm">{h.galleryDesc}</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-6 sm:gap-8 items-start">
          <ScrubberGallery />
          <div className="lg:sticky lg:top-20">
            <CustomizerPanel
              labels={{
                adjustPosition: dict.customizer.adjustPosition,
                height: dict.customizer.height,
                topOffset: dict.customizer.topOffset,
              }}
              previewLabels={{
                label: dict.preview.label,
                player: dict.preview.player,
              }}
            />
          </div>
        </div>
      </section>

      <Separator />

      <section className="grid sm:grid-cols-3 gap-4 sm:gap-6 text-center">
        {features.map(({ icon, title, desc }) => (
          <div key={title} className="space-y-2 p-4 sm:p-6 rounded-xl border border-border bg-card">
            <div className="text-3xl">{icon}</div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
