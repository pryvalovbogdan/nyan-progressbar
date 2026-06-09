import { Entry } from './types';

const store = new Map<string, Entry>();

const DAY_MS = 24 * 60 * 60 * 1000;

export function checkRateLimit(ip: string, maxPerDay = 1): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now >= entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + DAY_MS });

    return { allowed: true, retryAfterSec: 0 };
  }

  if (entry.count >= maxPerDay) {
    return { allowed: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;

  return { allowed: true, retryAfterSec: 0 };
}
