import { useLanguage } from '@/contexts/LanguageContext';
import { jozList } from '@/data/joz';
import { surahList } from '@/data/surah';
import { useIsMobile } from '@/hooks/use-mobile';
import { X, Search } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { StarNumber } from './Brand';
import { TOTAL_PAGES, formatNumber, getSurahForPage, normalizeArabic } from '@/lib/quran';
import { useBrowseQuran } from '@/lib/viewmodels/browse-quran.viewmodel';
import { cn } from '@/lib/utils';

interface TocItemProps {
  index: number;
  title: string;
  subtitle: string;
  active: boolean;
  onSelect: () => void;
  itemRef?: React.Ref<HTMLButtonElement>;
}

const TocItem = ({ index, title, subtitle, active, onSelect, itemRef }: TocItemProps) => {
  const { language } = useLanguage();
  return (
    <li>
      <button
        ref={itemRef}
        type="button"
        onClick={onSelect}
        aria-current={active ? 'true' : undefined}
        className={cn(
          'group flex w-full items-center gap-3 rounded-2xl px-2.5 py-2 text-start transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          active ? 'bg-primary/10' : 'hover:bg-accent/70',
        )}
      >
        <StarNumber value={formatNumber(index, language)} active={active} />
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              'block truncate font-display text-[15px] font-bold',
              active ? 'text-primary' : 'text-foreground',
            )}
          >
            {title}
          </span>
          <span className="block text-xs text-muted-foreground">{subtitle}</span>
        </span>
      </button>
    </li>
  );
};

// Radix wraps viewport content in a display:table div, which defeats truncation
const scrollAreaClass = 'min-h-0 flex-1 [&_[data-radix-scroll-area-viewport]>div]:!block';

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t, isRTL, language } = useLanguage();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<'joz' | 'surah'>('surah');
  const [searchQuery, setSearchQuery] = useState('');
  const activeItemRef = useRef<HTMLButtonElement>(null);

  const { activeSurah, activeJoz, selectSurah, selectJoz } = useBrowseQuran(TOTAL_PAGES);

  // Filter Surahs by Arabic name, English name or number
  const filteredSurahs = useMemo(() => {
    const query = normalizeArabic(searchQuery.trim());
    if (!query) return surahList;

    return surahList.filter(
      (surah) =>
        normalizeArabic(surah.name.ar).includes(query) ||
        normalizeArabic(surah.name.en).includes(query) ||
        String(surah.id) === query,
    );
  }, [searchQuery]);

  const activeSurahId = activeSurah?.id;
  const activeJozId = activeJoz?.id;

  // Keep the current Surah / Juz in view as the reader moves through the mushaf
  useEffect(() => {
    if (isMobile && !isSidebarOpen) return;
    // Scroll only the list's own viewport; scrollIntoView could also shift the fixed-height layout
    const item = activeItemRef.current;
    const viewport = item?.closest<HTMLElement>('[data-radix-scroll-area-viewport]');
    if (!item || !viewport) return;
    const itemBox = item.getBoundingClientRect();
    const viewportBox = viewport.getBoundingClientRect();
    if (itemBox.top < viewportBox.top || itemBox.bottom > viewportBox.bottom) {
      viewport.scrollTop += itemBox.top - viewportBox.top - (viewportBox.height - itemBox.height) / 2;
    }
  }, [activeSurahId, activeJozId, activeTab, isSidebarOpen, isMobile]);

  // Close the drawer with Escape on mobile
  useEffect(() => {
    if (!isMobile || !isSidebarOpen) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setIsSidebarOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobile, isSidebarOpen, setIsSidebarOpen]);

  const closeOnMobile = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  const pageLabel = (page: number) => `${t('pageShort')} ${formatNumber(page, language)}`;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <div
          className={cn(
            'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
            isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label={t('tableOfContents')}
        className={cn(
          'flex flex-col overflow-hidden',
          isMobile
            ? cn(
                'fixed inset-y-0 start-0 z-50 w-[86vw] max-w-sm border-e bg-card shadow-2xl transition-transform duration-300 ease-out',
                isRTL ? 'rounded-l-3xl' : 'rounded-r-3xl',
                !isSidebarOpen && (isRTL ? 'translate-x-full' : '-translate-x-full'),
              )
            : 'glass w-72 shrink-0 rounded-3xl lg:w-80',
        )}
        // React 18 has no typing for inert yet; it keeps the hidden drawer out of the tab order
        {...({ inert: isMobile && !isSidebarOpen ? '' : undefined } as object)}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between px-5 pb-3 pt-5">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">{t('tableOfContents')}</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">{t('tocSummary')}</p>
          </div>
          {isMobile && (
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="-me-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
              aria-label={t('closeSidebar')}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Tabs and Content */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'joz' | 'surah')}
          className="flex min-h-0 flex-1 flex-col"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="px-4">
            <TabsList className="grid h-11 w-full grid-cols-2 rounded-full bg-muted/80 p-1">
              <TabsTrigger
                value="surah"
                className="rounded-full text-sm font-semibold data-[state=active]:text-primary data-[state=active]:shadow-md"
              >
                {t('surahs')}
              </TabsTrigger>
              <TabsTrigger
                value="joz"
                className="rounded-full text-sm font-semibold data-[state=active]:text-primary data-[state=active]:shadow-md"
              >
                {t('juz')}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Surah Tab Content */}
          <TabsContent
            value="surah"
            className="mt-0 min-h-0 flex-1 data-[state=active]:flex data-[state=active]:flex-col"
          >
            <div className="px-4 py-3">
              <div className="relative">
                <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder={t('searchSurah')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-full border bg-background/70 pe-4 ps-10 text-sm transition placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30"
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            <ScrollArea className={scrollAreaClass}>
              {filteredSurahs.length === 0 ? (
                <div className="py-10 text-center text-sm text-muted-foreground">{t('noResults')}</div>
              ) : (
                <ul className="space-y-0.5 px-2.5 pb-3">
                  {filteredSurahs.map((surah) => {
                    const isActive = activeSurahId === surah.id;
                    return (
                      <TocItem
                        key={surah.id}
                        index={surah.id}
                        title={surah.name[isRTL ? 'ar' : 'en']}
                        subtitle={isRTL ? pageLabel(surah.page) : `${surah.name.ar} · ${pageLabel(surah.page)}`}
                        active={isActive}
                        onSelect={() => {
                          selectSurah(surah);
                          closeOnMobile();
                        }}
                        itemRef={isActive ? activeItemRef : undefined}
                      />
                    );
                  })}
                </ul>
              )}
            </ScrollArea>
          </TabsContent>

          {/* Joz Tab Content */}
          <TabsContent
            value="joz"
            className="mt-0 min-h-0 flex-1 data-[state=active]:flex data-[state=active]:flex-col"
          >
            <ScrollArea className={scrollAreaClass}>
              <ul className="space-y-0.5 px-2.5 py-3">
                {jozList.map((joz) => {
                  const isActive = activeJozId === joz.id;
                  return (
                    <TocItem
                      key={joz.id}
                      index={joz.id}
                      title={joz.name[isRTL ? 'ar' : 'en']}
                      subtitle={`${getSurahForPage(joz.page)?.name[isRTL ? 'ar' : 'en'] ?? ''} · ${pageLabel(joz.page)}`}
                      active={isActive}
                      onSelect={() => {
                        selectJoz(joz);
                        closeOnMobile();
                      }}
                      itemRef={isActive ? activeItemRef : undefined}
                    />
                  );
                })}
              </ul>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </aside>
    </>
  );
};

export default Sidebar;
