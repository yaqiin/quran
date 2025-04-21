
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DocumentViewer from "@/components/DocumentViewer";

const Index = () => {
  // Total number of pages in the document
  const TOTAL_PAGES = 604;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-2">كتاب العربية</h1>
          <p className="text-muted-foreground">استكشف الوثيقة بسهولة وسلاسة</p>
        </section>
        
        <section className="max-w-5xl mx-auto">
          <DocumentViewer totalPages={TOTAL_PAGES} />
        </section>
        
        <section id="about" className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">حول هذا الكتاب</h2>
          <p className="text-muted-foreground mb-4">
            هذا المشروع يقدم كتاباً من ٦٠٤ صفحة بتنسيق حديث وسهل الاستخدام. يتيح للقراء تصفح الصفحات 
            بطريقة سلسة ومريحة تحاكي تجربة قراءة الكتاب الورقي.
          </p>
          <p className="text-muted-foreground">
            يدعم العرض تخطيطاً مزدوجاً للصفحات على أجهزة الحاسب واللوحية، وعرضاً فردياً على 
            الأجهزة المحمولة، مع الحفاظ على نفس حجم الصفحات بغض النظر عن أبعاد ملفات SVG الأصلية.
          </p>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
