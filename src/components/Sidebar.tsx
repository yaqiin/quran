import { BrowserContext } from '@/contexts/BrowserContext/BrowserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { jozList } from '@/data/joz';
import { useIsMobile } from '@/hooks/use-mobile';
import { X } from 'lucide-react';
import React, { useContext } from 'react';

const Sidebar = ({ setIsSidebarOpen }: { setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { isRTL } = useLanguage();
  const isMobile = useIsMobile();

  const { setCurrentPage } = useContext(BrowserContext);

  return (
    <aside
      className={` ${
        isMobile
          ? 'fixed inset-0 z-50 flex flex-col bg-gray-100/95 px-4 pt-16 dark:bg-gray-800/95'
          : `sticky top-20 max-h-[80vh] min-w-[220px] transform overflow-y-auto rounded-xl p-4 shadow-md ${
              isRTL ? '' : 'md:order-first'
            }`
      } bg-gray-100 text-black transition-all duration-300 ease-in-out dark:bg-gray-800 dark:text-white`}
    >
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(false)}
          className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} rounded-full bg-gray-200 p-2 dark:bg-gray-700`}
        >
          <X size={20} />
        </button>
      )}

      <h2 className="mb-4 text-lg font-semibold tracking-wide">{isRTL ? 'قائمة الأجزاء' : 'Joz List'}</h2>
      <ul className={`space-y-2 ${isMobile ? 'flex-1 overflow-y-auto' : ''}`}>
        {jozList.map((element, index) => (
          <li
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(element.page);
              if (isMobile) setIsSidebarOpen(false);
            }}
            className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-all hover:scale-105 hover:bg-green-200 dark:hover:bg-green-700"
          >
            {element.name[isRTL ? 'ar' : 'en']}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
