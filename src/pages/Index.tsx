import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import DocumentViewer from '@/components/DocumentViewer.tsx';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { isRTL } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className={`flex h-screen flex-col overflow-hidden ${isRTL ? 'rtl' : 'ltr'} transition-colors`}>
      <Header />

      <div className="flex w-full flex-1 flex-col gap-2 overflow-hidden px-2 py-2 md:flex-row md:px-4 md:py-3">
        {/* Desktop Sidebar - Always visible */}
        {!isMobile && <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}

        {/* Mobile Sidebar - Conditional */}
        {isMobile && <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Sidebar Toggle Button - Mobile Only */}
          {isMobile && (
            <div className={`mb-2 flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="h-8 w-8 rounded-lg"
                aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Document Viewer */}
          <div className="flex flex-1 items-center justify-center overflow-auto">
            <DocumentViewer className="w-full max-w-7xl animate-fade-in" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
