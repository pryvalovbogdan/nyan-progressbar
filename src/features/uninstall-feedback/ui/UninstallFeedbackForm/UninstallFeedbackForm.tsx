'use client';

import { Check, ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import { Label } from '@shared/ui/label';
import { StarRating } from '@shared/ui/star-rating';
import { Textarea } from '@shared/ui/textarea';

import { EMPTY, MAX_FILES, MAX_SIZE, REASON_KEYS } from '../consts';
import type { Attachment, FormState, IUninstallFeedbackFormProps, ReasonKey } from './types';

function formatBytes(bytes: number): string {
  return bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function UninstallFeedbackForm({ t }: IUninstallFeedbackFormProps) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const screenshotRequired = form.whatWentWrong.trim().length > 0;

  function toggleReason(key: ReasonKey) {
    setForm(prev => ({
      ...prev,
      reasons: prev.reasons.includes(key) ? prev.reasons.filter(r => r !== key) : [...prev.reasons, key],
    }));
  }

  function readFile(file: File) {
    const reader = new FileReader();

    reader.onload = e => {
      const result = e.target?.result as string;
      const [header, data] = result.split(',');
      const mimeType = header.replace('data:', '').replace(';base64', '');

      setForm(prev => {
        if (prev.attachments.length >= MAX_FILES) return prev;

        return {
          ...prev,
          attachments: [
            ...prev.attachments,
            { name: file.name, data, mimeType, size: file.size, preview: result } satisfies Attachment,
          ],
        };
      });
    };

    reader.readAsDataURL(file);
  }

  function addFiles(files: File[], existingCount: number) {
    let remaining = MAX_FILES - existingCount;

    if (remaining <= 0) {
      toast.error(t.screenshotErrorMax);

      return;
    }

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        toast.error(t.screenshotErrorType);

        continue;
      }

      if (file.size > MAX_SIZE) {
        toast.error(t.screenshotErrorSize);

        continue;
      }

      if (remaining <= 0) {
        toast.error(t.screenshotErrorMax);

        break;
      }

      readFile(file);
      remaining -= 1;
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    addFiles(Array.from(e.target.files ?? []), form.attachments.length);

    e.target.value = '';
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(e.dataTransfer.files), form.attachments.length);
  }

  function removeAttachment(index: number) {
    setForm(prev => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();

    if (form.rating < 1 || form.reasons.length === 0) {
      toast.error(t.errorEmpty);

      return;
    }

    if (!form.email.includes('@')) {
      toast.error(t.errorEmail);

      return;
    }

    if (screenshotRequired && form.attachments.length === 0) {
      toast.error(t.errorScreenshot);

      return;
    }

    setLoading(true);

    try {
      const body = {
        name: '',
        email: form.email,
        category: 'uninstall',
        message: form.whatWentWrong || form.howToImprove || '(no message)',
        uninstall: {
          rating: form.rating,
          reasons: form.reasons.map(key => t.reasons[key]),
          whatWentWrong: form.whatWentWrong,
          howToImprove: form.howToImprove,
        },
        ...(form.attachments.length > 0 && {
          attachments: form.attachments.map(a => ({ name: a.name, data: a.data, mimeType: a.mimeType })),
        }),
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="email">{t.email}</Label>
        <Input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
          placeholder={t.emailPlaceholder}
        />
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t.ratingLabel}</p>
        <StarRating
          value={form.rating}
          onChange={value => setForm(prev => ({ ...prev, rating: value }))}
          ariaLabel={n => `${n} / 5`}
        />
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
        <Label>
          {t.screenshotLabel}{' '}
          <span className="text-muted-foreground font-normal">
            {form.attachments.length > 0
              ? `${form.attachments.length}/${MAX_FILES}`
              : screenshotRequired
                ? t.screenshotRequired
                : t.screenshotOptional}
          </span>
        </Label>

        {form.attachments.length > 0 && (
          <ul className="space-y-2">
            {form.attachments.map((attachment, index) => (
              <li key={`${attachment.name}-${index}`} className="flex items-center gap-3 card p-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
                  <Image src={attachment.preview} alt={attachment.name} fill className="object-cover" unoptimized />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-sm font-medium text-foreground truncate">{attachment.name}</p>
                  <p className="text-xs text-muted-foreground">{formatBytes(attachment.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  aria-label={t.screenshotRemove}
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {form.attachments.length < MAX_FILES && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={e => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={e => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`w-full rounded-xl border-2 border-dashed p-6 flex flex-col items-center gap-2.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80deea]/50 ${
              isDragging
                ? 'border-[#80deea] bg-[#80deea]/5'
                : 'border-border hover:border-[#80deea]/40 hover:bg-[#80deea]/5'
            }`}
          >
            <span
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                isDragging ? 'bg-[#80deea]/15' : 'bg-muted'
              }`}
            >
              <ImagePlus
                className={`w-5 h-5 transition-colors ${isDragging ? 'text-[#80deea]' : 'text-muted-foreground'}`}
              />
            </span>
            <span className="space-y-1 text-center">
              <span className="block text-sm font-medium text-foreground">
                {isDragging ? t.screenshotDrop : t.screenshotAttach}
              </span>
              <span className="block text-xs text-muted-foreground">{t.screenshotHint}</span>
            </span>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleInputChange}
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

      <Button type="submit" variant="accent" disabled={loading} className="w-full">
        {loading ? t.submitting : t.submit}
      </Button>
    </form>
  );
}
