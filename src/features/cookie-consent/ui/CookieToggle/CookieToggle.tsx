'use client';

import type { ICookieToggleProps } from './types';

export function CookieToggle({ id, title, description, checked, disabled, badge, onChange }: ICookieToggleProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-border bg-card/50 p-4">
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <label htmlFor={id} className="text-sm font-semibold text-foreground">
            {title}
          </label>
          {badge && (
            <span className="rounded-md bg-[#80deea]/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#80deea]">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
      </div>

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80deea]/50 ${
          checked ? 'bg-[#80deea]' : 'bg-muted'
        } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-background shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
