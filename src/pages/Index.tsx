import Footer from '@/components/Footer';
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
    <div className={`flex min-h-screen flex-col ${isRTL ? 'rtl' : 'ltr'} transition-colors`}>
      <Header />

      <div className="flex w-full flex-1 flex-col gap-6 px-4 py-6 md:flex-row md:px-6 lg:px-8">
        {/* Desktop Sidebar - Always visible */}
        {!isMobile && <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}

        {/* Mobile Sidebar - Conditional */}
        {isMobile && <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Sidebar Toggle Button - Mobile Only */}
          {isMobile && (
            <div className={`mb-4 flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="h-9 w-9 rounded-lg"
                aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Document Viewer */}
          <div className="flex flex-1 items-center justify-center">
            <DocumentViewer className="w-full max-w-7xl animate-fade-in" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
