import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import DocumentViewer from '@/components/DocumentViewer.tsx';

const Index = () => {
  const { isRTL } = useLanguage();

  return (
    <div className={`flex min-h-screen flex-col ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header />
      <DocumentViewer className="yaqiin-container flex-grow animate-fade-in py-6" />
      <Footer />
    </div>
  );
};

export default Index;
