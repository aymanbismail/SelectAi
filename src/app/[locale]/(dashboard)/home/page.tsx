import PageContainer from '@/components/layout/page-container';
import { HeroSection } from '@/components/hero-section';
import { MarqueeSection } from '@/components/marquee-section';
import { aiToolsData, categoryOrder } from '@/data/ai-tools';
import { getTranslations } from 'next-intl/server';

export const metadata = {
  title: 'Select AI - Home'
};

// Helper function to get category key for translations
function getCategoryKey(category: string): string {
  return category.toLowerCase().replace(/\s+/g, '');
}

// Helper function to get translated category name
function getTranslatedCategoryName(category: string, t: any): string {
  const key = category
    .toLowerCase()
    .replace(/\s+ai$/i, '')
    .replace(/\s+/g, '');
  return t(key) || category;
}

export default async function HomePage() {
  const t = await getTranslations('categories');
  const tTrending = await getTranslations('trending');

  return (
    <PageContainer scrollable={true}>
      <div className='w-full'>
        {/* Hero Section */}
        <HeroSection />

        {/* All Sections including Trending first (present in categoryOrder) */}
        <div className='space-y-8 pb-16'>
          {categoryOrder.map((category, index) => {
            const tools = aiToolsData[category];
            if (!tools) return null;
            const isTrending = category === 'Trending Tools';
            const direction = index % 2 === 0 ? 'left' : 'right';
            const categoryKey = getCategoryKey(category);
            const translatedTitle = isTrending
              ? tTrending('title')
              : getTranslatedCategoryName(category, t);
            const description = isTrending
              ? tTrending('description')
              : undefined;

            return (
              <MarqueeSection
                key={category}
                title={translatedTitle}
                tools={tools}
                direction={direction}
                speed={isTrending ? 35 : 40 + index * 5}
                categoryKey={isTrending ? undefined : categoryKey}
                description={description}
              />
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}
