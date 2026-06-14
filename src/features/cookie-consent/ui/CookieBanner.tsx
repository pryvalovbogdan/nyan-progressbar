'use client';

import { ChevronLeft, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@shared/ui/button';

import { useConsentStore } from '../model/consentStore';
import { CookieToggle } from './CookieToggle';
import type { ICookieBannerProps } from './types';

export function CookieBanner({ labels, privacyHref }: ICookieBannerProps) {
  const { status, analytics, marketing, hydrated, hydrate, acceptAll, rejectAll, savePreferences } = useConsentStore();
  const [view, setView] = useState<'notice' | 'preferences'>('notice');
  const [draftAnalytics, setDraftAnalytics] = useState(false);
  const [draftMarketing, setDraftMarketing] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (status === 'unset') {
      setDraftAnalytics(analytics);
      setDraftMarketing(marketing);
      setView('notice');
    }
  }, [status, analytics, marketing]);

  if (!hydrated || status !== 'unset') return null;

  const isPreferences = view === 'preferences';

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={labels.title}
      className="fixed bottom-0 right-0 z-50 w-full max-w-sm p-3 sm:bottom-4 sm:right-4 sm:p-0"
    >
      <div className="w-full rounded-2xl border border-border bg-background/95 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            {isPreferences && (
              <button
                type="button"
                onClick={() => setView('notice')}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label={labels.back}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
            <h2 className="text-sm font-semibold text-foreground">{labels.title}</h2>
          </div>
          <button
            type="button"
            onClick={rejectAll}
            className="-mr-1 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label={labels.close}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isPreferences ? (
          <div className="mt-4 space-y-3">
            <CookieToggle
              id="consent-necessary"
              title={labels.categories.necessary.title}
              description={labels.categories.necessary.description}
              checked
              disabled
              badge={labels.categories.necessary.alwaysOn}
            />
            <CookieToggle
              id="consent-analytics"
              title={labels.categories.analytics.title}
              description={labels.categories.analytics.description}
              checked={draftAnalytics}
              onChange={setDraftAnalytics}
            />
            <CookieToggle
              id="consent-marketing"
              title={labels.categories.marketing.title}
              description={labels.categories.marketing.description}
              checked={draftMarketing}
              onChange={setDraftMarketing}
            />
          </div>
        ) : (
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {labels.description}{' '}
            <Link href={privacyHref} className="text-[#80deea] underline-offset-4 hover:underline">
              {labels.policyLink}
            </Link>
          </p>
        )}

        <div className="mt-4 flex flex-col gap-2">
          {isPreferences ? (
            <Button
              onClick={() => savePreferences({ analytics: draftAnalytics, marketing: draftMarketing })}
              className="w-full bg-[#80deea] font-semibold text-background hover:bg-[#80deea]/90"
            >
              {labels.savePreferences}
            </Button>
          ) : (
            <>
              <Button
                onClick={acceptAll}
                className="w-full bg-[#80deea] font-semibold text-background hover:bg-[#80deea]/90"
              >
                {labels.acceptAll}
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={rejectAll} className="w-full">
                  {labels.rejectAll}
                </Button>
                <Button variant="ghost" onClick={() => setView('preferences')} className="w-full">
                  {labels.managePreferences}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
