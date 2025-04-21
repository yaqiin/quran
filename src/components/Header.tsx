
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-background border-b py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">كتاب العربية</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <a href="/" className="text-foreground hover:text-primary transition-colors">
            الصفحة الرئيسية
          </a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            حول الكتاب
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">
            تواصل معنا
          </a>
        </nav>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button variant="ghost" size="sm">
            مساعدة
          </Button>
        </div>
      </div>
    </header>
  );
}
