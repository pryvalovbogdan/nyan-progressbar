'use client';

import { Check, Mail, Star, UserRound } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import { Label } from '@shared/ui/label';
import { Textarea } from '@shared/ui/textarea';

import { EMPTY, REASON_KEYS } from './consts';
import type { FormState, IUninstallFeedbackFormProps, ReasonKey } from './types';

export function UninstallFeedbackForm({ t }: IUninstallFeedbackFormProps) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const modes = [
    {
      anonymous: true,
      icon: UserRound,
      label: t.modeAnonymous,
      description: t.modeAnonymousDesc,
    },
    {
      anonymous: false,
      icon: Mail,
      label: t.modeEmail,
      description: t.modeEmailDesc,
    },
  ];

  function toggleReason(key: ReasonKey) {
    setForm(prev => ({
      ...prev,
      reasons: prev.reasons.includes(key) ? prev.reasons.filter(r => r !== key) : [...prev.reasons, key],
    }));
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();

    if (form.rating < 1 || form.reasons.length === 0) {
      toast.error(t.errorEmpty);

      return;
    }

    if (!form.anonymous && !form.email.includes('@')) {
      toast.error(t.errorEmpty);

      return;
    }

    setLoading(true);

    try {
      const body = {
        name: '',
        email: form.anonymous ? '' : form.email,
        category: 'uninstall',
        message: form.whatWentWrong || form.howToImprove || '(no message)',
        uninstall: {
          rating: form.rating,
          reasons: form.reasons.map(key => t.reasons[key]),
          whatWentWrong: form.whatWentWrong,
          howToImprove: form.howToImprove,
          anonymous: form.anonymous,
        },
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.status === 429) {
        toast.error(t.errorRateLimit, { duration: 6000 });

        return;
      }

      if (!res.ok) throw new Error('Failed to send');

      toast.success(t.success);
      setForm(EMPTY);
    } catch {
      toast.error(t.errorGeneric);
    } finally {
      setLoading(false);
    }
  }

  const activeRating = hoveredRating || form.rating;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {modes.map(({ anonymous, icon: Icon, label, description }) => {
          const isSelected = form.anonymous === anonymous;

          return (
            <button
              key={String(anonymous)}
              type="button"
              onClick={() => setForm(prev => ({ ...prev, anonymous, email: anonymous ? '' : prev.email }))}
              className={`relative text-left rounded-xl border bg-card p-4 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80deea]/50 ${
                isSelected
                  ? 'border-[#80deea]/50 shadow-[0_0_0_1px_rgba(128,222,234,0.25),0_4px_24px_rgba(128,222,234,0.12)] -translate-y-0.5'
                  : 'border-border hover:border-border/80 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
              }`}
            >
              <span
                className={`absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isSelected ? 'bg-[#80deea] scale-100 opacity-100' : 'scale-75 opacity-0'
                }`}
              >
                <Check className="w-3 h-3 text-background stroke-[3]" />
              </span>

              <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#80deea]/10">
                <Icon className="w-5 h-5 text-[#80deea]" />
              </span>

              <span className="space-y-1 pr-4">
                <span className="block text-sm font-semibold text-foreground leading-tight">{label}</span>
                <span className="block text-xs text-muted-foreground leading-relaxed">{description}</span>
              </span>
            </button>
          );
        })}
      </div>

      {!form.anonymous && (
        <div className="space-y-1.5">
          <Label htmlFor="email">{t.email}</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            placeholder={t.emailPlaceholder}
          />
        </div>
      )}

      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t.ratingLabel}</p>
        <div className="flex items-center gap-1.5" onMouseLeave={() => setHoveredRating(0)}>
          {[1, 2, 3, 4, 5].map(value => {
            const isActive = value <= activeRating;

            return (
              <button
                key={value}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, rating: value }))}
                onMouseEnter={() => setHoveredRating(value)}
                aria-label={`${value} / 5`}
                className="rounded-md p-1 transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80deea]/50"
              >
                <Star
                  className={`w-7 h-7 transition-colors ${
                    isActive ? 'fill-[#80deea] text-[#80deea]' : 'text-muted-foreground'
                  }`}
                />
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground">{t.ratingHint}</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t.reasonsLabel}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {REASON_KEYS.map(key => {
            const checked = form.reasons.includes(key);

            return (
              <button
                key={key}
                type="button"
                role="checkbox"
                aria-checked={checked}
                onClick={() => toggleReason(key)}
                className={`flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5 text-left cursor-pointer transition-all duration-150 hover:border-[#80deea]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80deea]/50 ${
                  checked ? 'border-[#80deea]/50 bg-[#80deea]/5' : 'border-border'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                    checked ? 'border-[#80deea] bg-[#80deea] text-background' : 'border-input'
                  }`}
                >
                  {checked && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
                <span className="text-sm text-foreground">{t.reasons[key]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="whatWentWrong">{t.whatWentWrong}</Label>
        <Textarea
          id="whatWentWrong"
          value={form.whatWentWrong}
          onChange={e => setForm(prev => ({ ...prev, whatWentWrong: e.target.value }))}
          placeholder={t.whatWentWrongPlaceholder}
          rows={4}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="howToImprove">{t.howToImprove}</Label>
        <Textarea
          id="howToImprove"
          value={form.howToImprove}
          onChange={e => setForm(prev => ({ ...prev, howToImprove: e.target.value }))}
          placeholder={t.howToImprovePlaceholder}
          rows={4}
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#80deea] text-background font-semibold hover:bg-[#80deea]/90"
      >
        {loading ? t.submitting : t.submit}
      </Button>
    </form>
  );
}
