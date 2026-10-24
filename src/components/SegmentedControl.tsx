import React from 'react';
import { cn } from '@/lib/utils';

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps<T extends string> {
  value: T;
  options: SegmentedOption<T>[];
  onChange: (value: T) => void;
  label: string;
  /** Icon-only segments keep the text for screen readers and tooltips. */
  iconOnly?: boolean;
  className?: string;
}

/** One-tap choice between a few options, with a thumb that slides to the selection. */
export default function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  label,
  iconOnly,
  className,
}: SegmentedControlProps<T>) {
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    const isRTL = getComputedStyle(e.currentTarget).direction === 'rtl';
    const forward = isRTL ? 'ArrowLeft' : 'ArrowRight';
    const backward = isRTL ? 'ArrowRight' : 'ArrowLeft';
    if (e.key !== forward && e.key !== backward) return;
    e.preventDefault();
    e.stopPropagation();
    const step = e.key === forward ? 1 : -1;
    const next = options[(selectedIndex + step + options.length) % options.length];
    onChange(next.value);
    e.currentTarget.querySelector<HTMLElement>(`[data-value="${next.value}"]`)?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn(
        'relative grid h-9 items-center rounded-full bg-muted p-[3px] ring-1 ring-inset ring-border/70',
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-[3px] rounded-full bg-card shadow-sm ring-1 ring-black/5 transition-[inset-inline-start] duration-300 ease-out dark:bg-accent dark:ring-white/10"
        style={{
          width: `calc((100% - 6px) / ${options.length})`,
          insetInlineStart: `calc(3px + (100% - 6px) * ${selectedIndex / options.length})`,
        }}
      />
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={iconOnly ? option.label : undefined}
            title={iconOnly ? option.label : undefined}
            tabIndex={selected ? 0 : -1}
            data-value={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 inline-flex h-full min-w-0 items-center justify-center gap-1.5 rounded-full px-2.5 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              selected ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {option.icon}
            {!iconOnly && <span className="truncate">{option.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
