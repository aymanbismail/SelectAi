'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  GridView,
  Filters,
  Pagination,
  RowsPerPageSelector,
  ViewToggle
} from '@/components/ai';
import { useUrlState } from '@/components/ai/useUrlState';
import type { FilterState, AIItemBase, ViewMode } from '@/components/ai/types';
import type { CategoryType } from './types';
import {
  getCategoryBySlug,
  getCategoryNameFromSlug
} from '@/mock/data/categories';
import { mockTools } from '@/mock/data/tools';
import { mockAgents } from '@/mock/data/agents';
import { ArrowLeft, Sparkles, Bot } from 'lucide-react';
import Link from 'next/link';

interface CategoryDetailClientProps {
  slug: string;
  type: CategoryType;
}

// Filter and sort logic - pure function for client-side filtering
function filterAndSortItems(
  items: AIItemBase[],
  filters: FilterState
): AIItemBase[] {
  let filtered = [...items];

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.short_description.toLowerCase().includes(searchLower) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }

  // Pricing filter
  if (filters.pricing_type && filters.pricing_type !== 'all') {
    filtered = filtered.filter(
      (item) => item.pricing_type === filters.pricing_type
    );
  }

  // Featured filter
  if (filters.featured_only) {
    filtered = filtered.filter((item) => item.is_featured);
  }

  // Sorting
  filtered.sort((a, b) => {
    let comparison = 0;
    switch (filters.sort_by) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'created_at':
        comparison =
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        break;
      case 'average_rating':
        comparison = a.average_rating - b.average_rating;
        break;
      case 'usage_count':
        comparison = a.usage_count - b.usage_count;
        break;
      default:
        comparison = 0;
    }
    return filters.sort_order === 'asc' ? comparison : -comparison;
  });

  return filtered;
}

// Paginate items - pure function
function paginateItems(
  items: AIItemBase[],
  page: number,
  perPage: number
): AIItemBase[] {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return items.slice(start, end);
}

/**
 * CategoryDetailClientInner - Display items within a category
 */
function CategoryDetailClientInner({ slug, type }: CategoryDetailClientProps) {
  // Hooks must be called before any conditional returns
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Get category info
  const category = getCategoryBySlug(slug, type);
  const categoryName = getCategoryNameFromSlug(slug);

  // Get items for this category
  const allItems: AIItemBase[] = React.useMemo(() => {
    if (type === 'tool') {
      return mockTools.filter(
        (tool) => tool.category === categoryName
      ) as AIItemBase[];
    } else {
      return mockAgents.filter(
        (agent) => agent.category === categoryName
      ) as AIItemBase[];
    }
  }, [type, categoryName]);

  // URL state for filters
  const {
    filters,
    viewMode,
    currentPage,
    perPage,
    setFilters,
    setViewMode,
    setCurrentPage,
    setPerPage
  } = useUrlState();

  // Loading state
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort items
  const filteredItems = React.useMemo(
    () => filterAndSortItems(allItems, filters),
    [allItems, filters]
  );

  // Pagination
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const validCurrentPage = Math.min(
    Math.max(1, currentPage),
    Math.max(1, totalPages)
  );
  const paginatedItems = React.useMemo(
    () => paginateItems(filteredItems, validCurrentPage, perPage),
    [filteredItems, validCurrentPage, perPage]
  );

  // Handlers
  const handleItemClick = React.useCallback((item: AIItemBase) => {
    void item;
  }, []);

  const handlePageChange = React.useCallback(
    (page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [setCurrentPage]
  );

  const handlePerPageChange = React.useCallback(
    (value: number) => {
      setPerPage(value);
    },
    [setPerPage]
  );

  const handleViewChange = React.useCallback(
    (mode: ViewMode) => {
      setViewMode(mode);
    },
    [setViewMode]
  );

  // Handle category not found
  if (!category) {
    return (
      <PageContainer scrollable>
        <div className='flex flex-1 flex-col items-center justify-center space-y-4 py-16'>
          <div className='text-6xl'>🔍</div>
          <h2 className='text-foreground text-xl font-semibold'>
            Category not found
          </h2>
          <p className='text-muted-foreground'>
            The category you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href={
              type === 'tool' ? '/ai-tools/categories' : '/agents/categories'
            }
          >
            <Button
              variant='outline'
              className='border-border text-muted-foreground hover:border-border/80 hover:bg-accent hover:text-foreground bg-transparent'
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Categories
            </Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  const isTools = type === 'tool';
  const Icon = isTools ? Sparkles : Bot;
  const backUrl = isTools ? '/ai-tools/categories' : '/agents/categories';
  const itemLabel = isTools ? 'tools' : 'agents';

  return (
    <PageContainer scrollable>
      <div
        className='flex flex-1 flex-col space-y-6 py-6 pt-16'
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Back Navigation */}
        <Link
          href={backUrl}
          className='text-muted-foreground hover:text-foreground flex w-fit items-center gap-2 text-sm transition-colors'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to Categories
        </Link>

        {/* Category Header */}
        <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-4'>
            <div
              className={cn(
                'flex h-16 w-16 items-center justify-center',
                'rounded-2xl text-3xl',
                'bg-accent',
                'border-border border'
              )}
            >
              {category.icon}
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-foreground text-2xl font-bold tracking-tight'>
                  {category.name}
                </h1>
                {category.is_featured && (
                  <Badge
                    variant='secondary'
                    className='border-amber-500/20 bg-amber-500/10 text-amber-500'
                  >
                    Featured
                  </Badge>
                )}
              </div>
              <p className='text-muted-foreground mt-1 max-w-2xl'>
                {category.description}
              </p>
            </div>
          </div>
          <Badge
            variant='outline'
            className='border-border text-foreground px-3 py-1 text-sm'
          >
            <Icon className='mr-1.5 h-4 w-4' />
            {totalItems} {itemLabel}
          </Badge>
        </div>

        <Separator className='bg-border' />

        {/* Filters (without category selector since we're already in a category) */}
        <Filters
          filters={filters}
          onFiltersChange={setFilters}
          categories={[]}
          showCategoryFilter={false}
        />

        {/* View Controls */}
        <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-4'>
            <ViewToggle view={viewMode} onViewChange={handleViewChange} />
            <span className='text-muted-foreground text-sm'>
              {totalItems}{' '}
              {totalItems === 1 ? itemLabel.slice(0, -1) : itemLabel} found
            </span>
          </div>
          <RowsPerPageSelector
            value={perPage}
            onChange={handlePerPageChange}
            options={[12, 24, 48, 96]}
          />
        </div>

        {/* Content Area */}
        <div className='flex-1'>
          <GridView
            items={paginatedItems}
            onItemClick={handleItemClick}
            isLoading={isLoading}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={validCurrentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </PageContainer>
  );
}

/**
 * CategoryDetailSkeleton - Loading skeleton
 */
function CategoryDetailSkeleton({ type: _type }: { type: CategoryType }) {
  return (
    <PageContainer scrollable>
      <div className='flex flex-1 flex-col space-y-6 py-6 pt-16'>
        <div className='bg-muted/50 h-5 w-32 animate-pulse rounded' />
        <div className='flex items-center gap-4'>
          <div className='bg-muted/50 h-16 w-16 animate-pulse rounded-2xl' />
          <div className='space-y-2'>
            <div className='bg-muted h-8 w-48 animate-pulse rounded' />
            <div className='bg-muted/50 h-4 w-96 animate-pulse rounded' />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

/**
 * CategoryDetailClient - Client component for single category page
 * Shows all tools/agents in a specific category
 */
export default function CategoryDetailClient({
  slug,
  type
}: CategoryDetailClientProps) {
  return (
    <Suspense fallback={<CategoryDetailSkeleton type={type} />}>
      <CategoryDetailClientInner slug={slug} type={type} />
    </Suspense>
  );
}
