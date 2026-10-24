import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import DocumentViewer from '@/components/DocumentViewer.tsx';
import ReaderControls from '@/components/ReaderControls';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { GeometricPattern } from '@/components/Brand';

const Index = () => {
  const { isRTL } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`relative isolate flex h-dvh flex-col overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Backdrop, same language as yaqiin-landing's hero */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/80 via-background to-background dark:from-accent/50" />
        <GeometricPattern className="absolute inset-0 h-full w-full text-foreground/[0.035] dark:text-white/[0.02]" />
        <div className="absolute -top-48 start-1/3 h-[32rem] w-[32rem] rounded-full bg-primary/[0.07] blur-3xl" />
        <div className="absolute -bottom-32 end-0 h-80 w-80 rounded-full bg-gold/[0.12] blur-3xl dark:bg-gold/[0.04]" />
      </div>

      <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

      <div className="flex min-h-0 w-full flex-1 gap-4 px-3 pb-3 md:px-5 md:pb-5">
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <main className="flex min-h-0 min-w-0 flex-1 flex-col gap-3">
          <DocumentViewer className="min-h-0 flex-1" />
          <ReaderControls />
        </main>
      </div>
    </div>
  );
};

export default Index;
