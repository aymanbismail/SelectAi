'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatedContainer } from '@/components/animation/animated-container';

interface AIToolCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  logoUrl?: string;
  className?: string;
  index?: number;
}

export function AIToolCard({
  id,
  name,
  description,
  category,
  icon,
  logoUrl,
  className,
  index = 0
}: AIToolCardProps) {
  const locale = useLocale();
  const t = useTranslations('categories');
  const toolDescriptions = useTranslations('aiTools');
  const isRTL = locale === 'ar';

  // Get localized description
  const getLocalizedDescription = () => {
    if (isRTL && toolDescriptions(id)) {
      return toolDescriptions(id);
    }
    return description;
  };

  // Get translated category name
  const getTranslatedCategory = (categoryKey: string) => {
    const normalizedKey = categoryKey
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/ai$/, '');
    return t(normalizedKey) || categoryKey;
  };

  const translatedCategory = getTranslatedCategory(category);
  const localizedDescription = getLocalizedDescription();

  // Staggered animation: 0.05s delay per card
  const animationDelay = index * 0.05;

  return (
    <AnimatedContainer delay={animationDelay} className={className}>
      <Card
        className={cn(
          'h-20 w-fit flex-shrink-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-md sm:h-24 sm:w-72',
          'from-card/80 to-card/60 border-border/40 bg-gradient-to-br backdrop-blur-md',
          'hover:from-card hover:to-card/90 hover:border-border/60'
        )}
      >
        <CardContent
          className={cn(
            'flex h-full flex-col justify-center p-3 sm:p-3',
            isRTL && 'font-arabic'
          )}
        >
          {/* Small screens layout */}
          <div className='flex items-center gap-3 sm:hidden'>
            {isRTL ? (
              <>
                {/* Text first for RTL - will appear on left, logo on right */}
                <div className='min-w-0 flex-1 text-right' dir='rtl'>
                  <h3
                    className='text-foreground truncate text-sm font-semibold'
                    style={{ direction: 'rtl', textAlign: 'right' }}
                  >
                    {name}
                  </h3>
                  <Badge
                    variant='secondary'
                    className='mt-1 px-2 py-0.5 text-xs font-medium'
                  >
                    {translatedCategory}
                  </Badge>
                </div>
                {/* Logo second for RTL - will appear on right */}
                <div className='from-primary/15 to-primary/10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm'>
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={`${name} logo`}
                      width={20}
                      height={20}
                      className='rounded'
                    />
                  ) : (
                    <span className='text-primary text-sm font-bold'>
                      {icon || name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Logo first for LTR - will appear on left */}
                <div className='from-primary/15 to-primary/10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm'>
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={`${name} logo`}
                      width={20}
                      height={20}
                      className='rounded'
                    />
                  ) : (
                    <span className='text-primary text-sm font-bold'>
                      {icon || name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                {/* Text second for LTR - will appear on right */}
                <div className='min-w-0 flex-1 text-left'>
                  <h3 className='text-foreground truncate text-sm font-semibold'>
                    {name}
                  </h3>
                  <Badge
                    variant='secondary'
                    className='mt-1 px-2 py-0.5 text-xs font-medium'
                  >
                    {translatedCategory}
                  </Badge>
                </div>
              </>
            )}
          </div>

          {/* Medium and larger screens layout */}
          <div className='hidden flex-row items-center gap-3 sm:flex'>
            {isRTL ? (
              <>
                {/* Text first for RTL */}
                <div className='min-w-0 flex-1 text-right' dir='rtl'>
                  <div className='flex flex-row-reverse items-center justify-end gap-2'>
                    <Badge
                      variant='secondary'
                      className='px-2 py-0.5 text-xs font-medium'
                    >
                      {translatedCategory}
                    </Badge>
                    <h3
                      className='text-foreground truncate text-sm font-semibold'
                      style={{ direction: 'rtl', textAlign: 'right' }}
                    >
                      {name}
                    </h3>
                  </div>
                  <p
                    className='text-muted-foreground mt-1 overflow-hidden text-xs leading-snug'
                    dir='rtl'
                    style={{ textAlign: 'right', direction: 'rtl' }}
                  >
                    <span
                      className='block overflow-hidden text-ellipsis whitespace-nowrap'
                      style={{ direction: 'rtl', textAlign: 'right' }}
                    >
                      {localizedDescription.length > 60
                        ? `${localizedDescription.substring(0, 60)}...`
                        : localizedDescription}
                    </span>
                  </p>
                </div>
                {/* Logo on the right */}
                <div className='from-primary/15 to-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm'>
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={`${name} logo`}
                      width={24}
                      height={24}
                      className='rounded'
                    />
                  ) : (
                    <span className='text-primary text-lg font-bold'>
                      {icon || name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Logo on the left for LTR */}
                <div className='from-primary/15 to-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm'>
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={`${name} logo`}
                      width={24}
                      height={24}
                      className='rounded'
                    />
                  ) : (
                    <span className='text-primary text-lg font-bold'>
                      {icon || name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                {/* Text second for LTR */}
                <div className='min-w-0 flex-1 text-left'>
                  <div className='flex items-center gap-2'>
                    <h3 className='text-foreground truncate text-sm font-semibold'>
                      {name}
                    </h3>
                    <Badge
                      variant='secondary'
                      className='px-2 py-0.5 text-xs font-medium'
                    >
                      {translatedCategory}
                    </Badge>
                  </div>
                  <p className='text-muted-foreground mt-1 overflow-hidden text-left text-xs leading-snug'>
                    <span className='block overflow-hidden text-ellipsis whitespace-nowrap'>
                      {localizedDescription.length > 60
                        ? `${localizedDescription.substring(0, 60)}...`
                        : localizedDescription}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
}
