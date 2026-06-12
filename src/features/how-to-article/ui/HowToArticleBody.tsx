import Image from 'next/image';
import Link from 'next/link';

import { HOW_TO_ARTICLE_VIDEO_IDS, getHowToArticleStepImage } from '@entities/how-to-article';

import type { IHowToArticleBodyProps } from './types';

export function HowToArticleBody({ dict, lang, slug }: IHowToArticleBodyProps) {
  const h = dict.howToUse;
  const article = h.articles[slug];
  const videoId = HOW_TO_ARTICLE_VIDEO_IDS[slug];

  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold">{article.title}</h1>
        <p className="text-muted-foreground leading-relaxed">{article.intro}</p>
      </header>

      {videoId && (
        <section className="space-y-3">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">{h.videoLabel}</p>
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-card">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              title={article.title}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full"
            />
          </div>
        </section>
      )}

      <ol className="space-y-8">
        {article.steps.map((step, i) => (
          <li key={i} className="space-y-4">
            <div className="flex gap-4">
              <span
                aria-hidden="true"
                className="shrink-0 w-9 h-9 rounded-full bg-[#80deea]/15 text-[#80deea] font-semibold flex items-center justify-center"
              >
                {i + 1}
              </span>
              <div className="space-y-2 pt-1">
                <h2 className="text-xl font-semibold">{step.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            </div>
            <figure className="ml-[52px] overflow-hidden rounded-lg border border-border bg-card">
              <Image
                src={getHowToArticleStepImage(slug, i)}
                alt={`${h.screenshotAlt} ${step.heading}`}
                width={1280}
                height={720}
                unoptimized
                className="w-full h-auto"
              />
            </figure>
          </li>
        ))}
      </ol>

      <footer className="border-t border-border pt-6">
        <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">{h.nextStep}</p>
        <p className="text-muted-foreground leading-relaxed">
          {article.outroPre}{' '}
          <Link
            href={article.outroHref.startsWith('/') ? `/${lang}${article.outroHref}` : article.outroHref}
            className="text-[#80deea] hover:underline font-medium"
          >
            {article.outroLink}
          </Link>
          .
        </p>
      </footer>
    </article>
  );
}
