import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronLeft,
  SkipBack,
  SkipForward,
} from "lucide-react";
import PageViewer from "./PageViewer";

interface DocumentViewerProps {
  totalPages: number;
  className?: string;
}

export default function DocumentViewer({ totalPages, className }: DocumentViewerProps) {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState<number>(1);

  // ==== Improved "انتقال" Section state ====
  const [gotoPage, setGotoPage] = useState<string>("1");
  const [gotoError, setGotoError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ---- Pagination logic ----
  const pageIncrement = isMobile ? 1 : 2;

  useEffect(() => {
    if (!isMobile && currentPage % 2 === 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [isMobile, currentPage]);

  const goToNextPages = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + pageIncrement));
  };

  const goToPreviousPages = () => {
    setCurrentPage((prev) => Math.max(1, prev - pageIncrement));
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(
      isMobile
        ? totalPages
        : totalPages % 2 === 0
        ? totalPages - 1
        : totalPages
    );
  };

  // ==== Improved Go To Page Logic ====
  const handleGoto = () => {
    const page = parseInt(gotoPage, 10);
    if (isNaN(page) || page < 1 || page > totalPages) {
      setGotoError(`رقم الصفحة يجب أن يكون بين 1 و ${totalPages}`);
      inputRef.current?.focus();
    } else {
      setCurrentPage(page);
      setGotoError(null);
      setGotoPage(String(page));
      inputRef.current?.blur();
    }
  };

  // Allow Enter key to trigger transition
  const handleGotoInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGoto();
    }
  };

  // Keep goto field in sync if user changes page elsewhere
  useEffect(() => {
    setGotoPage(String(currentPage));
    setGotoError(null);
  }, [currentPage]);

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
            <SkipForward className="h-4 w-4" />
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
            disabled={
              isMobile
                ? currentPage === totalPages
                : currentPage + 1 >= totalPages
            }
            title="الصفحة التالية"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={goToLastPage}
            disabled={
              isMobile
                ? currentPage === totalPages
                : currentPage + 1 >= totalPages
            }
            title="الصفحة الأخيرة"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
        </div>

        {/* Improved Page number input */}
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="goto-input" className="text-right w-full text-xs md:text-sm font-bold mb-1 text-muted-foreground">
            اذهب إلى صفحة معينة
          </label>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <input
              id="goto-input"
              ref={inputRef}
              type="number"
              min={1}
              max={totalPages}
              value={gotoPage}
              onChange={(e) => setGotoPage(e.target.value.replace(/\D/, ""))}
              onKeyDown={handleGotoInputKeyDown}
              className={`w-20 md:w-28 h-10 px-2 border rounded text-center focus:ring-2 focus:ring-primary transition-all`}
              aria-label="رقم الصفحة"
            />
            <Button
              variant="secondary"
              onClick={handleGoto}
            >
              انتقال
            </Button>
          </div>
          {gotoError && (
            <div className="mt-2 text-xs text-red-500 animate-fadeIn" role="alert">
              {gotoError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
