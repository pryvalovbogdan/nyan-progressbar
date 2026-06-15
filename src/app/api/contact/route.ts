import { NextRequest, NextResponse } from 'next/server';

import { sendContactEmail } from '@shared/lib/mailer';
import { checkRateLimit } from '@shared/lib/rateLimit';
import { ContactPayload } from '@shared/lib/types';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? req.headers.get('x-real-ip') ?? 'unknown';
  const { allowed, retryAfterSec } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again tomorrow.' },
      { status: 429, headers: { 'Retry-After': String(retryAfterSec) } },
    );
  }

  try {
    const body: unknown = await req.json();

    if (!isContactPayload(body)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await sendContactEmail(body);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed', err);

    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

function isContactPayload(v: unknown): v is ContactPayload {
  if (!v || typeof v !== 'object') return false;

  const p = v as Record<string, unknown>;

  if (
    typeof p.name !== 'string' ||
    typeof p.email !== 'string' ||
    typeof p.category !== 'string' ||
    typeof p.message !== 'string'
  ) {
    return false;
  }

  const isUninstall = p.category === 'uninstall';

  if (isUninstall) {
    if (!isUninstallBlock(p.uninstall)) return false;

    if (p.email.length > 0 && !p.email.includes('@')) return false;
  } else {
    if (p.name.length === 0 || !p.email.includes('@') || p.category.length === 0 || p.message.length === 0) {
      return false;
    }
  }

  if (p.attachment !== undefined) {
    if (!p.attachment || typeof p.attachment !== 'object') return false;

    const a = p.attachment as Record<string, unknown>;

    if (typeof a.name !== 'string' || typeof a.data !== 'string' || typeof a.mimeType !== 'string') return false;

    if (!a.mimeType.startsWith('image/')) return false;
  }

  return true;
}

function isUninstallBlock(v: unknown): boolean {
  if (!v || typeof v !== 'object') return false;

  const u = v as Record<string, unknown>;

  if (typeof u.rating !== 'number' || u.rating < 1 || u.rating > 5) return false;

  if (!Array.isArray(u.reasons) || !u.reasons.every(r => typeof r === 'string')) return false;

  if (typeof u.whatWentWrong !== 'string' || typeof u.howToImprove !== 'string') return false;

  if (typeof u.anonymous !== 'boolean') return false;

  return true;
}
