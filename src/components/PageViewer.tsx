
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import PageSkeleton from "./PageSkeleton";

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
  const pagePath = `/pages/${formattedPageNumber}.svg`;
  
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
      <div className={cn("flex items-center justify-center bg-muted rounded-lg", className)}>
        <p className="text-muted-foreground">لا توجد صفحة</p>
      </div>
    );
  }
  
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden bg-white rounded-lg shadow-md", className)}>
      {isLoading && <PageSkeleton />}
      
      {error ? (
        <div className="flex items-center justify-center p-8">
          <p className="text-destructive">{error}</p>
        </div>
      ) : (
        <>
          {/* For the demo, we'll use placeholder images */}
          <img 
            src={pagePath}
            alt={`صفحة ${pageNumber}`}
            className={cn(
              "w-full h-full object-contain transition-opacity duration-300", 
              isLoading ? "opacity-0" : "opacity-100"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          
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
          
          <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded-full">
            {pageNumber}
          </span>
        </>
      )}
    </div>
  );
}
