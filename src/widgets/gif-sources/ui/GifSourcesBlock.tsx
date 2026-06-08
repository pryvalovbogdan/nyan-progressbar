import Image from 'next/image';

import { GIF_SOURCES } from './consts';
import type { IGifSourcesBlockProps } from './types';

const PREVIEW_BG = ['bg-[#1e3a5f]', 'bg-[#80deea99]/20', 'bg-[#FFDAB9]'];

export function GifSourcesBlock({ heading, description, browseCta, sourceDescriptions }: IGifSourcesBlockProps) {
  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{heading}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="flex flex-col gap-4">
        {GIF_SOURCES.map(source => (
          <a
            key={source.name}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row rounded-xl border border-border bg-card overflow-hidden hover:border-[#80deea]/40 hover:shadow-[0_4px_16px_rgba(128,222,234,0.12)] transition-all duration-200"
          >
            <div className="flex flex-row sm:w-[420px] shrink-0">
              {source.previews.map((preview, i) => (
                <div
                  key={preview.src}
                  className={`flex-1 aspect-video overflow-hidden ${PREVIEW_BG[i % PREVIEW_BG.length]}`}
                >
                  <Image
                    src={preview.src}
                    alt={preview.alt}
                    width={200}
                    height={112}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center gap-2 px-6 py-5 flex-1">
              <span className="font-bold text-base">{source.name}</span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {sourceDescriptions[source.name] ?? source.description}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-1 text-sm font-medium text-[#80deea] w-fit">
                {browseCta}
                <svg
                  viewBox="0 0 16 16"
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
