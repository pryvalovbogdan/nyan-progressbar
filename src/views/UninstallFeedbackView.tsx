import type { Dictionary } from '@/i18n';

import { UninstallFeedbackForm } from '@features/uninstall-feedback';
import { PageContainer } from '@shared/ui';

interface IUninstallFeedbackViewProps {
  dict: Dictionary;
}

export function UninstallFeedbackView({ dict }: IUninstallFeedbackViewProps) {
  const u = dict.contact.uninstall;

  return (
    <PageContainer maxWidth="2xl" space="md">
      <section className="space-y-3">
        <h1 className="text-4xl font-bold">{u.heading}</h1>
        <p className="text-muted-foreground">{u.description}</p>
      </section>
      <div className="card p-6 sm:p-8">
        <UninstallFeedbackForm t={u.form} />
      </div>
    </PageContainer>
  );
}
