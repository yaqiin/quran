import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import DocumentViewer from '@/components/DocumentViewer.tsx';
import { useState } from 'react';
import { List, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from '@/components/Sidebar';

const Index = () => {
  const { isRTL } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className={`flex min-h-screen flex-col pt-4 ${isRTL ? 'rtl' : 'ltr'} transition-colors`}>
      <Header />

      <div className="flex w-full flex-1 flex-col justify-center gap-4 px-2 py-6 md:flex-row md:px-4">
        {isSidebarOpen && <Sidebar setIsSidebarOpen={setIsSidebarOpen} />}

        <div className="flex grow flex-col gap-4">
          <div className="flex">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`rounded-md bg-white p-2 text-black shadow-md backdrop-blur-md dark:bg-gray-700 dark:text-white ${
                isRTL ? 'ml-auto' : 'mr-auto'
              }`}
            >
              {isSidebarOpen && !isMobile ? <X size={20} /> : <List size={20} />}
            </button>
          </div>

          <DocumentViewer className="yaqiin-container w-full animate-fade-in rounded-lg shadow-inner" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
