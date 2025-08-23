'use client';

import { Marquee } from '@/components/ui/marquee';
import { AIToolCard } from '@/components/ai-tool-card';
import { AITool } from '@/data/ai-tools';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface MarqueeSectionProps {
  title: string;
  tools: AITool[];
  direction: 'left' | 'right';
  speed?: number;
  description?: string;
  categoryKey?: string;
}

export function MarqueeSection({
  title,
  tools,
  direction,
  speed = 40,
  description,
  categoryKey
}: MarqueeSectionProps) {
  const locale = useLocale();
  const t = useTranslations('categoryDescriptions');
  const isRTL = locale === 'ar';
  const effectiveDirection = isRTL
    ? direction === 'left'
      ? 'right'
      : 'left'
    : direction;

  // Get translated description or fallback to provided description
  const getDescription = () => {
    if (categoryKey && t(categoryKey)) {
      return t(categoryKey);
    }
    if (description) {
      return description;
    }
    // Default fallback
    return isRTL
      ? `اكتشف أحدث أدوات الذكاء الاصطناعي في ${title}`
      : `Discover the latest AI tools in ${title.toLowerCase()}`;
  };

  return (
    <div className='w-full'>
      {/* Title section with container padding */}
      <div
        className={cn(
          'mb-3 px-4',
          isRTL ? 'flex flex-col items-end text-right' : 'text-left'
        )}
      >
        <h2 className='text-foreground text-2xl font-bold'>{title}</h2>
        <p className='text-muted-foreground mt-1 text-sm'>{getDescription()}</p>
      </div>

      {/* Marquee section with full viewport width */}
      <div className='relative right-1/2 left-1/2 -mr-[100vw] mb-3 -ml-[50vw] w-screen'>
        <Marquee
          direction={effectiveDirection}
          speed={speed}
          pauseOnHover={true}
          rtl={isRTL}
          className='w-full'
        >
          {tools.map((tool) => (
            <AIToolCard
              key={tool.id}
              id={tool.id}
              name={tool.name}
              description={tool.description}
              category={tool.category}
              icon={tool.icon}
              logoUrl={tool.logoUrl}
              className='mx-0.5 sm:mx-2'
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
