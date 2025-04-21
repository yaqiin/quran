
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DocumentViewer from "@/components/DocumentViewer";

const Index = () => {
  const TOTAL_PAGES = 604;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="max-w-5xl mx-auto">
          <DocumentViewer totalPages={TOTAL_PAGES} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
