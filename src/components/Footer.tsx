
export default function Footer() {
  return (
    <footer className="bg-muted py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} كتاب العربية. جميع الحقوق محفوظة.
          </p>
          
          <div className="mt-4 md:mt-0 flex space-x-6 rtl:space-x-reverse">
            <a href="#privacy" className="text-muted-foreground hover:text-primary text-sm">
              سياسة الخصوصية
            </a>
            <a href="#terms" className="text-muted-foreground hover:text-primary text-sm">
              شروط الاستخدام
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary text-sm">
              اتصل بنا
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
