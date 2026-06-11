import type { Dictionary } from '@/i18n';

interface IPrivacyViewProps {
  dict: Dictionary;
}

export function PrivacyView({ dict }: IPrivacyViewProps) {
  const p = dict.privacy;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-16 space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">{p.heading}</h1>
        <p className="text-muted-foreground text-sm">{p.lastUpdated}</p>
      </header>

      <p className="text-muted-foreground leading-relaxed">{p.intro}</p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{p.s1Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{p.s1Body}</p>
        <p className="text-muted-foreground leading-relaxed">
          {p.s1OptOutPre}{' '}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#80deea] hover:underline"
          >
            {p.s1OptOutLink}
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{p.s2Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{p.s2Body1}</p>
        <p className="text-muted-foreground leading-relaxed">{p.s2Body2}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{p.s3Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{p.s3Body}</p>
        <p className="text-muted-foreground leading-relaxed">{p.s3Rights}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{p.s4Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{p.s4Body}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{p.s5Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{p.s5Intro}</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>{p.s5Item1}</li>
          <li>{p.s5Item2}</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed">{p.s5Body}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{p.s6Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{p.s6Body}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{p.s7Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">{p.s7Body}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{p.s8Heading}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {p.s8Pre}{' '}
          <a href={`mailto:${process.env.CONTACT_TO}`} className="text-[#80deea] hover:underline">
            {process.env.CONTACT_TO}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
