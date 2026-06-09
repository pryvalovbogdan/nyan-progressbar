import { CHANGE_TYPE_COLORS, CHANGE_TYPE_LABELS, VERSIONS } from './consts';
import type { IChangelogSectionProps } from './types';

export function ChangelogSection({ heading, viewAllLabel }: IChangelogSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{heading}</h2>
        <a
          href="https://github.com/pryvalovbogdan/nyan-plugin-youtube/commits/main"
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent text-sm shrink-0"
        >
          {viewAllLabel} →
        </a>
      </div>

      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />

        <ol className="space-y-8">
          {VERSIONS.map(entry => (
            <li key={entry.version} className="relative pl-8">
              <div
                className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                  entry.latest ? 'bg-[#80deea] border-[#80deea]' : 'bg-background border-border'
                }`}
              />

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`font-mono text-sm font-semibold px-2 py-0.5 rounded border ${
                      entry.latest
                        ? 'bg-[#80deea]/15 text-[#80deea] border-[#80deea]/40'
                        : 'bg-card text-foreground border-border'
                    }`}
                  >
                    v{entry.version}
                  </span>

                  {entry.latest && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#80deea] text-background font-semibold">
                      latest
                    </span>
                  )}

                  <time className="text-xs text-muted-foreground">{entry.date}</time>
                </div>

                <ul className="space-y-1.5">
                  {entry.changes.map((change, i) => (
                    <li key={i} className="flex flex-wrap items-start gap-2 text-sm">
                      <span
                        className={`shrink-0 mt-0.5 text-[11px] font-medium px-1.5 py-0.5 rounded border ${CHANGE_TYPE_COLORS[change.type]}`}
                      >
                        {CHANGE_TYPE_LABELS[change.type]}
                      </span>
                      <span className="text-muted-foreground leading-snug">{change.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
