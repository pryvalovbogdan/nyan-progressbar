import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui/card';
import { buttonVariants } from '@shared/ui/button';
import type { Dictionary } from '@shared/dictionaries';

interface Props {
  dict: Dictionary;
}

export function SupportView({ dict }: Props) {
  const s = dict.support;

  const tiles = [
    { icon: '☕', title: s.kofiTitle, description: s.kofiDesc, href: 'https://ko-fi.com/nyancustombar', buttonLabel: s.kofiBtn, accentColor: '#ff5e5b' },
    { icon: '🎗️', title: s.patreonTitle, description: s.patreonDesc, href: 'https://patreon.com', buttonLabel: s.patreonBtn, accentColor: '#ff424d' },
    { icon: '☕', title: s.bmcTitle, description: s.bmcDesc, href: 'https://buymeacoffee.com', buttonLabel: s.bmcBtn, accentColor: '#ffdd00' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-16 space-y-8 sm:space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{s.heading}</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">{s.description}</p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {tiles.map(({ icon, title, description, href, buttonLabel, accentColor }) => (
          <Card key={title} className="flex flex-col border-border bg-card hover:border-[#80deea]/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(128,222,234,0.12)]">
            <CardHeader className="pb-3">
              <div className="text-4xl mb-2">{icon}</div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ className: 'w-full text-background font-semibold' })}
                style={{ backgroundColor: accentColor }}
              >
                {buttonLabel}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">{s.thankYou}</p>
    </div>
  );
}
