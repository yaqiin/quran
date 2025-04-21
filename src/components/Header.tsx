import {useNavigate} from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

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

        <div className="hidden md:flex gap-2 flex-wrap">
          {/*Menu Items*/}
        </div>
      </div>
    </header>
  );
}
