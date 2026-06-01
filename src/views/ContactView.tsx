import { ContactForm } from '@features/contact-form';
import type { Dictionary } from '@shared/dictionaries';

interface Props {
  dict: Dictionary;
}

export function ContactView({ dict }: Props) {
  const c = dict.contact;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-16 space-y-8 sm:space-y-10">
      <section className="space-y-3">
        <h1 className="text-4xl font-bold">{c.heading}</h1>
        <p className="text-muted-foreground">{c.description}</p>
      </section>

      <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <ContactForm t={c.form} />
      </div>

      <p className="text-xs text-muted-foreground text-center">
        {c.githubPre}{' '}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#80deea] hover:underline"
        >
          {c.githubLink}
        </a>
        .
      </p>
    </div>
  );
}
