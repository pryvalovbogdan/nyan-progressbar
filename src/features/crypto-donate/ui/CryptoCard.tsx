'use client';

import { useState } from 'react';

import { QR_PATH } from '@features/crypto-donate/ui/consts';
import { ICryptoCard } from '@features/crypto-donate/ui/types';
import { trackEvent } from '@shared/lib/analytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui/card';

const WALLET_ADDRESS = process.env.NEXT_PUBLIC_CRYPTO_WALLET_ADDRESS as string;

export function CryptoCard({ title, description, networkLabel, copyLabel, copiedLabel }: ICryptoCard) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(WALLET_ADDRESS);
    setCopied(true);
    trackEvent('donate_click', { platform: 'crypto' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="flex flex-col border-border bg-card hover:border-[#f3ba2f]/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(243,186,47,0.12)]">
      <CardHeader className="pb-3">
        <div className="text-4xl mb-2">₿</div>
        <div className="flex items-center gap-2 flex-wrap">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-[#f3ba2f]/15 text-[#c9961a]">{networkLabel}</span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="mt-auto space-y-4">
        <div className="flex justify-center">
          <div className="rounded-lg border border-border p-2 bg-white">
            <svg height="96" width="96" viewBox="0 0 33 33">
              <path fill="#FFFFFF" d="M0,0 h33v33H0z" shapeRendering="crispEdges" />
              <path fill="#000000" d={QR_PATH} shapeRendering="crispEdges" />
            </svg>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground text-center font-mono break-all leading-relaxed select-all">
          {WALLET_ADDRESS}
        </p>

        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-black transition-all duration-200 hover:brightness-90 active:scale-[0.97]"
          style={{ backgroundColor: copied ? '#22c55e' : '#f3ba2f' }}
        >
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {copiedLabel}
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              {copyLabel}
            </>
          )}
        </button>
      </CardContent>
    </Card>
  );
}
