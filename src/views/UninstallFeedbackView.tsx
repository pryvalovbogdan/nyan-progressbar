import type { Dictionary } from '@/i18n';

import { UninstallFeedbackForm } from '@features/uninstall-feedback';

interface IUninstallFeedbackViewProps {
  dict: Dictionary;
}

export function UninstallFeedbackView({ dict }: IUninstallFeedbackViewProps) {
  const u = dict.contact.uninstall;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-16 space-y-8 sm:space-y-10">
      <section className="space-y-3">
        <h1 className="text-4xl font-bold">{u.heading}</h1>
        <p className="text-muted-foreground">{u.description}</p>
      </section>
      <div className="card p-6 sm:p-8">
        <UninstallFeedbackForm t={u.form} />
      </div>
    </div>
  );
}
