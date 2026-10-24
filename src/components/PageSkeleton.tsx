import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface PageSkeletonProps {
  className?: string;
}

// Rough silhouette of a mushaf page: ornamented frame with 15 lines of text
const LINE_WIDTHS = [
  '100%',
  '96%',
  '100%',
  '92%',
  '100%',
  '98%',
  '100%',
  '94%',
  '100%',
  '97%',
  '100%',
  '93%',
  '100%',
  '99%',
  '70%',
];

export default function PageSkeleton({ className }: PageSkeletonProps) {
  const { t } = useLanguage();

  return (
    <div className={cn('absolute inset-0 p-[7%]', className)} role="status" aria-label={t('loading')}>
      <div className="flex h-full flex-col rounded-lg border-2 border-emerald-900/10 p-[6%]">
        <div className="mx-auto mb-[5%] h-[5%] w-1/2 animate-pulse rounded-full bg-emerald-900/10" />
        <div className="flex flex-1 flex-col justify-between">
          {LINE_WIDTHS.map((width, i) => (
            <div
              key={i}
              className="ms-auto h-[2.2%] animate-pulse rounded-full bg-emerald-900/[0.07]"
              style={{ width, animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
