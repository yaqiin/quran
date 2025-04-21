
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-background border-b py-4">
      <div className="flex flex-row lg:flex-row md:flex-col justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4 hover:cursor-pointer" onClick={() => navigate("/")}>
            {/*Logo*/}
            <img
              src="/logo.png"
              alt="يقين"
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-mosque-primary">القرأن الكريم</h1>
              <p className="text-mosque-accent text-sm md:text-base">
                يقين للقرأن العظيم
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-4">
          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label={theme === "dark" ? "تبديل إلى الوضع النهاري" : "تبديل إلى الوضع الليلي"}
            title={theme === "dark" ? "الوضع النهاري" : "الوضع الليلي"}
            onClick={toggleTheme}
            className="transition-all"
          >
            {theme === "dark" ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
