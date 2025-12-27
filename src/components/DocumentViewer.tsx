import PageViewer from './PageViewer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBrowseQuran } from '@/lib/viewmodels/browse-quran.viewmodel';

interface DocumentViewerProps {
  className?: string;
}

export default function DocumentViewer({ className }: DocumentViewerProps) {
  const totalPages = 604; // Total number of pages in the document
  const { isRTL } = useLanguage();

  const { isMobile, currentPage } = useBrowseQuran(totalPages);

  const getPageDisplay = () => {
    if (isMobile) {
      return [
        <PageViewer
          key={currentPage}
          pageNumber={currentPage}
          totalPages={totalPages}
          className="aspect-[3/4] w-full max-w-md animate-fade-in"
        />,
      ];
    }

    return [
      <PageViewer
        key={currentPage + 1}
        pageNumber={currentPage + 1}
        totalPages={totalPages}
        className="animate-slideInRight aspect-[3/4] w-1/2 max-w-md"
      />,
      <PageViewer
        key={currentPage}
        pageNumber={currentPage}
        totalPages={totalPages}
        className="animate-slideInLeft aspect-[3/4] w-1/2 max-w-md"
      />,
    ];
  };

  return (
    <div className={className} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex w-full items-center justify-center">
        {/* Pages container */}
        <div
          className={`flex w-full items-center justify-center gap-1 md:gap-2 lg:gap-3 ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          {getPageDisplay()}
        </div>
      </div>
    </div>
  );
}
