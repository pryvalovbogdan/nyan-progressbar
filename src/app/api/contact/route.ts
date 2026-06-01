import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail, ContactPayload } from '@shared/lib/mailer';

export async function POST(req: NextRequest) {
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

  const coreValid =
    typeof p.name === 'string' &&
    typeof p.email === 'string' &&
    typeof p.category === 'string' &&
    typeof p.message === 'string' &&
    p.name.length > 0 &&
    p.email.includes('@') &&
    p.category.length > 0 &&
    p.message.length > 0;

  if (!coreValid) return false;

  if (p.attachment !== undefined) {
    if (!p.attachment || typeof p.attachment !== 'object') return false;

    const a = p.attachment as Record<string, unknown>;

    if (typeof a.name !== 'string' || typeof a.data !== 'string' || typeof a.mimeType !== 'string') return false;

    if (!a.mimeType.startsWith('image/')) return false;
  }

  return true;
}
