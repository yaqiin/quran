import { useId } from 'react';
import { cn } from '@/lib/utils';

// Brand marks shared with yaqiin-landing so both products look like one family.

export function MosqueIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3v2" />
      <path d="M12 5c-3 2.2-5.5 3.6-5.5 7h11c0-3.4-2.5-4.8-5.5-7Z" />
      <path d="M5 12h14v9H5z" />
      <path d="M10 21v-4a2 2 0 0 1 4 0v4" />
      <path d="M2 21h20" />
      <path d="M2 21V9l1.5-2L5 9v3" />
      <path d="M22 21V9l-1.5-2L19 9v3" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-amber-300 shadow-md shadow-primary/20',
        className,
      )}
    >
      <MosqueIcon className="h-[55%] w-[55%]" />
    </span>
  );
}

export function EightPointStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} aria-hidden="true">
      <rect x="20" y="20" width="60" height="60" rx="4" />
      <rect x="20" y="20" width="60" height="60" rx="4" transform="rotate(45 50 50)" />
    </svg>
  );
}

/** A number set inside an eight-point star, used for Surah and Juz indices. */
export function StarNumber({ value, active, className }: { value: string; active?: boolean; className?: string }) {
  return (
    <span className={cn('relative inline-flex h-9 w-9 shrink-0 items-center justify-center', className)}>
      <EightPointStar
        className={cn(
          'absolute inset-0 h-full w-full transition-colors',
          active ? 'text-primary' : 'text-accent group-hover:text-primary/20',
        )}
      />
      <span
        className={cn(
          'relative text-[11px] font-bold tabular-nums',
          active ? 'text-primary-foreground' : 'text-accent-foreground',
        )}
      >
        {value}
      </span>
    </span>
  );
}

export function GeometricPattern({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg className={className} aria-hidden="true">
      <defs>
        <pattern id={id} width="80" height="80" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="20" y="20" width="40" height="40" />
            <rect x="20" y="20" width="40" height="40" transform="rotate(45 40 40)" />
            <circle cx="40" cy="40" r="8" />
            <path d="M0 0l20 20M80 0L60 20M0 80l20-20M80 80L60 60" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
