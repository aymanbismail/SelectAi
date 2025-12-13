'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import { CategoryGrid } from './CategoryGrid';
import { CategoryFilters } from './CategoryFilters';
import { CategoryStats } from './CategoryStats';
import { CategoryHeader } from './CategoryHeader';
import { useCategoryUrlState } from './useCategoryUrlState';
import type { Category, CategoryType } from './types';
import {
  mockToolCategories,
  mockAgentCategories,
  searchCategories,
  categoryStats
} from '@/mock/data/categories';

interface CategoryClientProps {
  type: CategoryType;
}

/**
 * CategoryClientInner - The actual client component with URL-synced state
 * Shared between Tool Categories and Agent Categories pages
 */
function CategoryClientInner({ type }: CategoryClientProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('categoryPage');

  // State from URL - ready for API integration
  const {
    search,
    setSearch
    // These are prepared for future API usage:
    // with_counts, lang, featured_only
  } = useCategoryUrlState();

  // Loading state for initial render
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  // Get categories based on type
  const baseCategories =
    type === 'tool' ? mockToolCategories : mockAgentCategories;

  // Filter categories based on search (client-side for now)
  // Future: Replace with API call: GET /api/categories?type={type}&with_counts=true&lang=en
  const filteredCategories = React.useMemo(() => {
    return searchCategories(baseCategories, search);
  }, [baseCategories, search]);

  // Calculate stats
  const totalItems = baseCategories.reduce(
    (sum, cat) =>
      sum + (type === 'tool' ? cat.tools_count || 0 : cat.agents_count || 0),
    0
  );

  const totalCategories =
    type === 'tool'
      ? categoryStats.totalToolCategories
      : categoryStats.totalAgentCategories;

  // Handle category click
  const handleCategoryClick = React.useCallback((category: Category) => {
    // Navigation is handled by Link in CategoryCard
    void category;
  }, []);

  return (
    <PageContainer scrollable>
      <div
        className='flex flex-1 flex-col space-y-6 py-6 pt-16'
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header Section */}
        <CategoryHeader type={type} />

        <Separator className='bg-border' />

        {/* Filters Section */}
        <CategoryFilters
          search={search}
          onSearchChange={setSearch}
          type={type}
          onTypeChange={() => {}} // No-op for single type page
          showTypeToggle={false}
        />

        {/* Results count */}
        <div className='flex items-center justify-between'>
          <span className='text-muted-foreground text-sm'>
            {filteredCategories.length}{' '}
            {filteredCategories.length === 1
              ? t('categoryFound')
              : t('categoriesFound')}
          </span>
        </div>

        {/* Categories Grid */}
        <CategoryGrid
          categories={filteredCategories}
          isLoading={isLoading}
          onCategoryClick={handleCategoryClick}
        />

        {/* Stats Section */}
        <div className='pt-4'>
          <CategoryStats
            totalCategories={totalCategories}
            totalItems={totalItems}
            type={type}
          />
        </div>
      </div>
    </PageContainer>
  );
}

/**
 * CategoryClientSkeleton - Loading skeleton for category pages
 */
function CategoryClientSkeleton({ type: _type }: CategoryClientProps) {
  return (
    <PageContainer scrollable>
      <div className='flex flex-1 flex-col space-y-6 py-6 pt-16'>
        <div className='flex items-center gap-3'>
          <div
            className={cn(
              'flex items-center justify-center',
              'h-12 w-12 rounded-xl',
              'bg-accent',
              'border-border border',
              'animate-pulse'
            )}
          />
          <div className='space-y-2'>
            <div className='bg-muted h-7 w-40 animate-pulse rounded' />
            <div className='bg-muted/50 h-4 w-56 animate-pulse rounded' />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

/**
 * CategoryClient - Unified Client Component for Category pages
 * Wrapped in Suspense to handle useSearchParams
 */
export default function CategoryClient({ type }: CategoryClientProps) {
  return (
    <Suspense fallback={<CategoryClientSkeleton type={type} />}>
      <CategoryClientInner type={type} />
    </Suspense>
  );
}
