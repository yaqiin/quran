import { BrowserContext } from '@/contexts/BrowserContext/BrowserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { jozList } from '@/data/joz';
import { surahList } from '@/data/surah';
import { useIsMobile } from '@/hooks/use-mobile';
import { X, BookOpen, Search } from 'lucide-react';
import React, { useContext, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isRTL } = useLanguage();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<'joz' | 'surah'>('joz');
  const [searchQuery, setSearchQuery] = useState('');

  const browserContext = useContext(BrowserContext);
  if (!browserContext) {
    throw new Error('Sidebar must be used within BrowserProvider');
  }
  const { currentPage, setCurrentPage } = browserContext;

  // Filter Surahs based on search query
  const filteredSurahs = useMemo(() => {
    if (!searchQuery.trim()) return surahList;

    const query = searchQuery.toLowerCase();
    return surahList.filter((surah) => {
      const arabicName = surah.name.ar.toLowerCase();
      const englishName = surah.name.en.toLowerCase();
      return arabicName.includes(query) || englishName.includes(query);
    });
  }, [searchQuery]);

  // Find active Surah based on current page
  const getActiveSurahId = () => {
    for (let i = surahList.length - 1; i >= 0; i--) {
      if (currentPage >= surahList[i].page) {
        return surahList[i].id;
      }
    }
    return null;
  };

  const activeSurahId = getActiveSurahId();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`${
          isMobile
            ? 'fixed inset-y-0 z-50 flex w-80 flex-col border-r bg-background shadow-xl transition-transform duration-300 ease-out'
            : `sticky top-[6.5rem] flex min-w-[260px] flex-col rounded-lg border bg-card shadow-sm ${
                isRTL ? '' : 'md:order-first'
              }`
        } ${isMobile ? (isRTL ? 'right-0' : 'left-0') : ''} ${isMobile && !isSidebarOpen ? (isRTL ? 'translate-x-full' : '-translate-x-full') : ''}`}
        style={!isMobile ? { maxHeight: 'calc(100vh - 7rem)' } : undefined}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b bg-muted/50 p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">{isRTL ? 'جدول المحتويات' : 'Table of Contents'}</h2>
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          )}
        </div>

        {/* Tabs and Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as 'joz' | 'surah')}
            className="flex h-full flex-col"
          >
            <div className="border-b px-3 pt-3">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="joz" className="text-xs sm:text-sm">
                  {isRTL ? 'الأجزاء' : 'Juz'}
                </TabsTrigger>
                <TabsTrigger value="surah" className="text-xs sm:text-sm">
                  {isRTL ? 'السور' : 'Surahs'}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Joz Tab Content */}
            <TabsContent value="joz" className="mt-0 flex-1 overflow-hidden data-[state=active]:flex">
              <ScrollArea className="h-full w-full">
                <ul className="space-y-1 py-3">
                  {jozList.map((element, index) => (
                    <li key={index}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(element.page);
                          if (isMobile) setIsSidebarOpen(false);
                        }}
                        className="w-full rounded-md px-4 py-2.5 text-left text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                      >
                        <span className="flex items-center justify-between">
                          <span>{element.name[isRTL ? 'ar' : 'en']}</span>
                          <span className="text-xs text-muted-foreground">ص {element.page}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </TabsContent>

            {/* Surah Tab Content */}
            <TabsContent
              value="surah"
              className="flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col"
            >
              {/* Search Input */}
              <div className="border-b p-3">
                <div className="relative">
                  <Search
                    className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`}
                  />
                  <Input
                    type="text"
                    placeholder={isRTL ? 'ابحث عن سورة...' : 'Search surah...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`h-9 ${isRTL ? 'pl-3 pr-9' : 'pl-9 pr-3'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              {/* Surah List */}
              <ScrollArea className="flex-1">
                <div className="p-3">
                  {filteredSurahs.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted-foreground">
                      {isRTL ? 'لم يتم العثور على نتائج' : 'No results found'}
                    </div>
                  ) : (
                    <ul className="space-y-1">
                      {filteredSurahs.map((surah) => {
                        const isActive = activeSurahId === surah.id;
                        return (
                          <li key={surah.id}>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(surah.page);
                                if (isMobile) setIsSidebarOpen(false);
                              }}
                              className={`w-full rounded-md px-3 py-2.5 text-left text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none ${isActive ? 'bg-primary/10 font-semibold text-primary' : ''} `}
                            >
                              <span className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">#{surah.id}</span>
                                  <span>{surah.name[isRTL ? 'ar' : 'en']}</span>
                                </span>
                                <span className="text-xs text-muted-foreground">ص {surah.page}</span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
