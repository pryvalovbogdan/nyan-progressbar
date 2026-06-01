'use client';

import { useState } from 'react';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';
import { Textarea } from '@shared/ui/textarea';
import { Label } from '@shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/ui/select';
import { toast } from 'sonner';

interface FormTranslations {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  category: string;
  categoryPlaceholder: string;
  categoryBug: string;
  categoryFeature: string;
  categoryQuestion: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  errorEmpty: string;
  errorGeneric: string;
  success: string;
}

interface Props {
  t: FormTranslations;
}

interface FormState {
  name: string;
  email: string;
  category: string | null;
  message: string;
}

const EMPTY: FormState = { name: '', email: '', category: null, message: '' };

export function ContactForm({ t }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name || !form.email || !form.category || !form.message.trim()) {
      toast.error(t.errorEmpty);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

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
    <form onSubmit={handleSubmit} className="space-y-5">
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
        <Label htmlFor="category">{t.category}</Label>
        <Select value={form.category ?? undefined} onValueChange={(v) => setForm((prev) => ({ ...prev, category: v }))}>
          <SelectTrigger id="category">
            <SelectValue placeholder={t.categoryPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Bug Report">{t.categoryBug}</SelectItem>
            <SelectItem value="Feature Request">{t.categoryFeature}</SelectItem>
            <SelectItem value="General Question">{t.categoryQuestion}</SelectItem>
          </SelectContent>
        </Select>
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
