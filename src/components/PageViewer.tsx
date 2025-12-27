import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import PageSkeleton from './PageSkeleton';

interface PageViewerProps {
  pageNumber: number;
  totalPages: number;
  className?: string;
}

export default function PageViewer({ pageNumber, totalPages, className }: PageViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format page number to 3 digits with leading zeros
  const formattedPageNumber = pageNumber.toString().padStart(3, '0');

  // SVG path
  const pagePath = `https://raw.githubusercontent.com/yaqiin/quran-svg/refs/heads/main/hafs/${formattedPageNumber}.svg`;

  useEffect(() => {
    // Reset loading state when page changes
    setIsLoading(true);
    setError(null);

    // Simulate loading - in production, this would be real SVG loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pageNumber]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError(`لم يتم العثور على الصفحة ${pageNumber}`);
  };

  if (pageNumber > totalPages || pageNumber < 1) {
    return (
      <div className={cn('flex items-center justify-center rounded-lg bg-muted', className)}>
        <p className="text-muted-foreground">لا توجد صفحة</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-lg border bg-card shadow-lg transition-shadow hover:shadow-xl',
        className,
      )}
    >
      {isLoading && <PageSkeleton />}

      {error ? (
        <div className="flex items-center justify-center p-8">
          <p className="text-destructive">{error}</p>
        </div>
      ) : (
        <>
          <div className="h-full w-full bg-white dark:bg-white">
            <img
              src={pagePath}
              alt={`صفحة ${pageNumber}`}
              className={cn(
                'h-full w-full object-contain transition-opacity duration-500',
                isLoading ? 'opacity-0' : 'opacity-100',
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>

          {/* This would be the actual SVG in production */}
          {/*
          <object
            data={pagePath}
            type="image/svg+xml"
            className={cn(
              "w-full h-full transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
          >
            <img
              src={`https://placehold.co/800x1200/e2e8f0/1e293b?text=صفحة+${pageNumber}`}
              alt={`صفحة ${pageNumber}`}
              className="w-full h-full object-contain"
            />
          </object>
          */}

          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            {pageNumber}
          </span>
        </>
      )}
    </div>
  );
}
