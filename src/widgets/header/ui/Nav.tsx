'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';
import type { Heart, IDonateButtonProps, NavProps } from './types';
import { HEART_COLORS } from './consts';

function DonateButton({ href, label, isActive }: IDonateButtonProps) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const spawnHearts = useCallback(() => {
    const newHearts: Heart[] = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 70 - 35,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      size: 9 + Math.random() * 9,
      delay: i * 55,
      duration: 1300 + Math.random() * 400,
      rotate: Math.random() * 30 - 15,
    }));

    setHearts(prev => [...prev, ...newHearts]);
  }, []);

  const removeHeart = useCallback((id: number) => {
    setHearts(prev => prev.filter(h => h.id !== id));
  }, []);

  return (
    <Link
      href={href}
      onMouseEnter={spawnHearts}
      className="relative ml-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.05] hover:shadow-[0_0_16px_rgba(255,100,130,0.4)] active:scale-[0.97] overflow-visible"
      style={{
        background: isActive
          ? 'linear-gradient(135deg, #ff6b8a, #ff8c42)'
          : 'linear-gradient(135deg, #ff6b8a99, #ff8c4299)',
        color: '#fff',
      }}
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      {label}

      {hearts.map(heart => (
        <svg
          key={heart.id}
          viewBox="0 0 24 24"
          fill={heart.color}
          className="donate-heart absolute"
          onAnimationEnd={() => removeHeart(heart.id)}
          style={
            {
              left: `calc(50% + ${heart.x}px)`,
              width: heart.size,
              height: heart.size,
              color: heart.color,
              '--heart-delay': `${heart.delay}ms`,
              '--heart-duration': `${heart.duration}ms`,
              '--heart-rotate': `${heart.rotate}deg`,
            } as React.CSSProperties
          }
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </Link>
  );
}

export function Nav({ labels, lang }: NavProps) {
  const pathname = usePathname();

  const links = [
    { href: `/${lang}`, label: labels.home },
    { href: `/${lang}/extension`, label: labels.extension },
    { href: `/${lang}/customizer`, label: labels.customize },
    { href: `/${lang}/reviews`, label: labels.reviews },
    { href: `/${lang}/support`, label: labels.support },
    { href: `/${lang}/contact`, label: labels.contact },
  ];

  return (
    <nav className="flex gap-1 items-center">
      {links.map(({ href, label }) => {
        if (href === `/${lang}/support`) {
          return <DonateButton key={href} href={href} label={label} isActive={pathname === href} />;
        }

        return (
          <Link
            key={href}
            href={href}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              pathname === href
                ? 'bg-[#80deea]/20 text-[#80deea]'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
