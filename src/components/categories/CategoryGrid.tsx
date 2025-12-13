'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { CategoryCard } from './CategoryCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useLocale, useTranslations } from 'next-intl';
import type { CategoryGridProps, Category } from './types';

/**
 * CategoryCardSkeleton - Loading placeholder for category card
 */
function CategoryCardSkeleton() {
  return (
    <div
      className={cn(
        'relative h-full overflow-hidden rounded-2xl',
        'bg-card/50 backdrop-blur-[6px]',
        'border-border border',
        'p-6'
      )}
    >
      <div className='flex h-full flex-col'>
        {/* Icon and Badge skeleton */}
        <div className='mb-4 flex items-start justify-between'>
          <div className='bg-muted h-14 w-14 animate-pulse rounded-xl' />
          <div className='bg-muted h-5 w-16 animate-pulse rounded-full' />
        </div>

        {/* Name skeleton */}
        <div className='bg-muted mb-2 h-6 w-3/4 animate-pulse rounded' />

        {/* Description skeleton */}
        <div className='flex-1 space-y-2'>
          <div className='bg-muted/70 h-4 w-full animate-pulse rounded' />
          <div className='bg-muted/70 h-4 w-5/6 animate-pulse rounded' />
          <div className='bg-muted/70 h-4 w-4/6 animate-pulse rounded' />
        </div>

        {/* Footer skeleton */}
        <div className='border-border mt-4 flex items-center justify-between border-t pt-4'>
          <div className='bg-muted/70 h-4 w-24 animate-pulse rounded' />
          <div className='bg-muted/70 h-5 w-12 animate-pulse rounded-full' />
        </div>
      </div>
    </div>
  );
}

/**
 * CategoryGrid - Responsive grid layout for categories
 * Shows loading skeletons when isLoading is true
 */
export function CategoryGrid({
  categories,
  isLoading = false,
  onCategoryClick
}: CategoryGridProps) {
  const locale = useLocale();
  const t = useTranslations('categoryPage');
  const isRTL = locale === 'ar';

  // Show skeletons when loading
  if (isLoading) {
    return (
      <div
        className={cn(
          'grid gap-6',
          'grid-cols-1',
          'sm:grid-cols-2',
          'lg:grid-cols-3',
          'xl:grid-cols-4'
        )}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Empty state
  if (categories.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center',
          'px-4 py-16',
          'rounded-2xl',
          'bg-card/50 backdrop-blur-[6px]',
          'border-border border'
        )}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className='mb-4 text-6xl'>📂</div>
        <h3 className='text-foreground mb-2 text-lg font-semibold'>
          {t('noCategoriesFound')}
        </h3>
        <p className='text-muted-foreground max-w-md text-center text-sm'>
          {t('noCategoriesFoundDesc')}
        </p>
      </div>
    );
  }

  // Category grid
  return (
    <div
      className={cn(
        'grid gap-6',
        'grid-cols-1',
        'sm:grid-cols-2',
        'lg:grid-cols-3',
        'xl:grid-cols-4'
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {categories.map((category: Category, index: number) => (
        <CategoryCard
          key={category.id}
          category={category}
          onClick={() => onCategoryClick?.(category)}
          index={index}
        />
      ))}
    </div>
  );
}
