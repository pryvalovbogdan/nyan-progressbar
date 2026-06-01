'use client';

import { useState, useRef } from 'react';
import { Bug, Lightbulb, MessageCircle, Check, ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import { Textarea } from '@shared/ui/textarea';
import { Label } from '@shared/ui/label';
import { toast } from 'sonner';
import type { Props, FormState, CategoryCard, Attachment } from './types';

export type { FormTranslations } from './types';

const EMPTY: FormState = { name: '', email: '', category: null, message: '', attachment: null };
const MAX_SIZE = 5 * 1024 * 1024;

function formatBytes(bytes: number): string {
  return bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function ContactForm({ t }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: CategoryCard[] = [
    {
      value: 'Bug Report',
      icon: Bug,
      label: t.categoryBug,
      description: t.categoryBugDesc,
      iconColor: 'text-red-400',
      iconBg: 'bg-red-400/10',
      selectedBorder: 'border-red-400/50',
      selectedShadow: 'shadow-[0_0_0_1px_rgba(248,113,113,0.25),0_4px_24px_rgba(248,113,113,0.12)]',
    },
    {
      value: 'Feature Request',
      icon: Lightbulb,
      label: t.categoryFeature,
      description: t.categoryFeatureDesc,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-400/10',
      selectedBorder: 'border-amber-400/50',
      selectedShadow: 'shadow-[0_0_0_1px_rgba(251,191,36,0.25),0_4px_24px_rgba(251,191,36,0.12)]',
    },
    {
      value: 'General Question',
      icon: MessageCircle,
      label: t.categoryQuestion,
      description: t.categoryQuestionDesc,
      iconColor: 'text-[#80deea]',
      iconBg: 'bg-[#80deea]/10',
      selectedBorder: 'border-[#80deea]/50',
      selectedShadow: 'shadow-[0_0_0_1px_rgba(128,222,234,0.25),0_4px_24px_rgba(128,222,234,0.12)]',
    },
  ];

  const set =
    (field: keyof Pick<FormState, 'name' | 'email' | 'message'>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      toast.error(t.screenshotErrorType);

      return;
    }

    if (file.size > MAX_SIZE) {
      toast.error(t.screenshotErrorSize);

      return;
    }

    const reader = new FileReader();

    reader.onload = e => {
      const result = e.target?.result as string;
      const [header, data] = result.split(',');
      const mimeType = header.replace('data:', '').replace(';base64', '');

      setForm(prev => ({
        ...prev,
        attachment: { name: file.name, data, mimeType, size: file.size, preview: result } satisfies Attachment,
      }));
    };

    reader.readAsDataURL(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) handleFile(file);

    e.target.value = '';
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];

    if (file) handleFile(file);
  }

  function removeAttachment() {
    setForm(prev => ({ ...prev, attachment: null }));
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();

    if (!form.name || !form.email || !form.category || !form.message.trim()) {
      toast.error(t.errorEmpty);

      return;
    }

    setLoading(true);

    try {
      const body = {
        name: form.name,
        email: form.email,
        category: form.category,
        message: form.message,
        ...(form.attachment && {
          attachment: {
            name: form.attachment.name,
            data: form.attachment.data,
            mimeType: form.attachment.mimeType,
          },
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
      <div className="space-y-2.5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t.category}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {categories.map(
            ({ value, icon: Icon, label, description, iconColor, iconBg, selectedBorder, selectedShadow }) => {
              const isSelected = form.category === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, category: value }))}
                  className={`relative text-left rounded-xl border bg-card p-4 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80deea]/50 ${
                    isSelected
                      ? `${selectedBorder} ${selectedShadow} -translate-y-0.5`
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

                  <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </span>

                  <span className="space-y-1 pr-4">
                    <span className="block text-sm font-semibold text-foreground leading-tight">{label}</span>
                    <span className="block text-xs text-muted-foreground leading-relaxed">{description}</span>
                  </span>
                </button>
              );
            },
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">{t.name}</Label>
          <Input id="name" value={form.name} onChange={set('name')} placeholder={t.namePlaceholder} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">{t.email}</Label>
          <Input id="email" type="email" value={form.email} onChange={set('email')} placeholder={t.emailPlaceholder} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">{t.message}</Label>
        <Textarea
          id="message"
          value={form.message}
          onChange={set('message')}
          placeholder={t.messagePlaceholder}
          rows={5}
        />
      </div>

      <div className="space-y-1.5">
        <Label>
          {t.screenshotLabel} <span className="text-muted-foreground font-normal">{t.screenshotOptional}</span>
        </Label>

        {form.attachment ? (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
              <Image
                src={form.attachment.preview}
                alt={form.attachment.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1 min-w-0 space-y-0.5">
              <p className="text-sm font-medium text-foreground truncate">{form.attachment.name}</p>
              <p className="text-xs text-muted-foreground">{formatBytes(form.attachment.size)}</p>
            </div>
            <button
              type="button"
              onClick={removeAttachment}
              className="shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label={t.screenshotRemove}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
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

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleInputChange} />
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
