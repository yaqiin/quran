
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  ChevronLeft,
  SkipBack,
  SkipForward
} from "lucide-react";
import PageViewer from "./PageViewer";

interface DocumentViewerProps {
  totalPages: number;
  className?: string;
}

export default function DocumentViewer({ totalPages, className }: DocumentViewerProps) {
  const isMobile = useIsMobile();
  
  // For desktop/tablet, we show two pages (even-odd pairs)
  // For mobile, we show one page at a time
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Calculate page increment based on view mode (1 for mobile, 2 for desktop)
  const pageIncrement = isMobile ? 1 : 2;
  
  // For desktop/tablet, we want to ensure we always start with an odd page (right side of book)
  useEffect(() => {
    if (!isMobile && currentPage % 2 === 0) {
      setCurrentPage(prev => prev - 1);
    }
  }, [isMobile, currentPage]);
  
  const goToNextPages = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + pageIncrement));
  };
  
  const goToPreviousPages = () => {
    setCurrentPage(prev => Math.max(1, prev - pageIncrement));
  };
  
  const goToFirstPage = () => {
    setCurrentPage(1);
  };
  
  const goToLastPage = () => {
    setCurrentPage(isMobile ? totalPages : (totalPages % 2 === 0 ? totalPages - 1 : totalPages));
  };
  
  return (
    <div className={className}>
      <div className="flex flex-col items-center space-y-8">
        {/* Pages container */}
        <div className="w-full flex flex-row-reverse items-center justify-center gap-1 md:gap-2 lg:gap-3">
          {isMobile ? (
            // Mobile view - one page
            <PageViewer 
              pageNumber={currentPage} 
              totalPages={totalPages}
              className="w-full aspect-[3/4] max-w-md animate-fadeIn"
            />
          ) : (
            // Desktop/tablet view - two pages
            <>
              {/* Left page (even) */}
              <PageViewer 
                pageNumber={currentPage + 1} 
                totalPages={totalPages}
                className="w-1/2 aspect-[3/4] max-w-md animate-slideInLeft"
              />
              
              {/* Right page (odd) */}
              <PageViewer 
                pageNumber={currentPage} 
                totalPages={totalPages}
                className="w-1/2 aspect-[3/4] max-w-md animate-slideInRight"
              />
            </>
          )}
        </div>
        
        {/* Navigation controls */}
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
          <Button
            variant="outline"
            size="icon"
            onClick={goToFirstPage}
            disabled={currentPage === 1}
            title="الصفحة الأولى"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousPages}
            disabled={currentPage === 1}
            title="الصفحة السابقة"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <div className="mx-4 text-sm font-medium">
            <span>{currentPage}</span>
            {!isMobile && currentPage + 1 <= totalPages && (
              <>
                <span className="mx-1">-</span>
                <span>{currentPage + 1}</span>
              </>
            )}
            <span className="mx-1 text-muted-foreground">من</span>
            <span>{totalPages}</span>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPages}
            disabled={isMobile ? currentPage === totalPages : currentPage + 1 >= totalPages}
            title="الصفحة التالية"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={goToLastPage}
            disabled={isMobile ? currentPage === totalPages : currentPage + 1 >= totalPages}
            title="الصفحة الأخيرة"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Page number input */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (!isNaN(page) && page >= 1 && page <= totalPages) {
                setCurrentPage(page);
              }
            }}
            className="w-16 h-10 px-2 border rounded text-center"
          />
          <Button 
            variant="secondary"
            onClick={() => {
              // Handle go to page
              const inputEl = document.querySelector('input[type="number"]') as HTMLInputElement;
              const page = parseInt(inputEl.value);
              if (!isNaN(page) && page >= 1 && page <= totalPages) {
                setCurrentPage(page);
              }
            }}
          >
            انتقال
          </Button>
        </div>
      </div>
    </div>
  );
}
