'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { cn } from '@/lib/utils';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Filters,
  GridView,
  TableView,
  ViewToggle,
  Pagination,
  RowsPerPageSelector
} from '@/components/ai';
import { useUrlState } from './useUrlState';
import type { FilterState, AIItemBase } from '@/components/ai/types';
import { mockTools, categories } from '@/mock/data/tools';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

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
        item.category.toLowerCase().includes(searchLower) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }

  // Category filter
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter((item) => item.category === filters.category);
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
 * ToolsClientInner - The actual client component with URL-synced state
 * Must be wrapped in Suspense because it uses useSearchParams
 */
function ToolsClientInner() {
  // All state is now driven by URL
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

  // Loading state for initial render
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Compute filtered and sorted items (memoized)
  const filteredItems = React.useMemo(
    () => filterAndSortItems(mockTools as AIItemBase[], filters),
    [filters]
  );

  // Compute pagination
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / perPage);

  // Ensure current page is valid
  const validCurrentPage = Math.min(
    Math.max(1, currentPage),
    Math.max(1, totalPages)
  );

  const paginatedItems = React.useMemo(
    () => paginateItems(filteredItems, validCurrentPage, perPage),
    [filteredItems, validCurrentPage, perPage]
  );

  // Handle item click - navigate to tool detail
  const handleItemClick = React.useCallback((item: AIItemBase) => {
    // TODO: Navigate to tool detail page when implemented
    void item;
  }, []);

  // Handle page change
  const handlePageChange = React.useCallback(
    (page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [setCurrentPage]
  );

  // Handle per page change
  const handlePerPageChange = React.useCallback(
    (value: number) => {
      setPerPage(value);
    },
    [setPerPage]
  );

  // Handle view mode change
  const handleViewChange = React.useCallback(
    (mode: 'grid' | 'table') => {
      setViewMode(mode);
    },
    [setViewMode]
  );

  return (
    <PageContainer scrollable>
      <div className='flex flex-1 flex-col space-y-6 py-6 pt-16'>
        {/* Header Section */}
        <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-3'>
            <div
              className={cn(
                'flex items-center justify-center',
                'h-12 w-12 rounded-xl',
                'bg-accent',
                'border-border border'
              )}
            >
              <Sparkles className='text-foreground h-6 w-6' />
            </div>
            <div>
              <h1 className='text-foreground text-2xl font-bold tracking-tight'>
                AI Tools
              </h1>
              <p className='text-muted-foreground'>
                Discover the best AI tools for your needs
              </p>
            </div>
          </div>
          <Link href='/ai-tools/new'>
            <Button
              className={cn(
                'bg-primary hover:bg-primary/90',
                'text-primary-foreground',
                'transition-all duration-200',
                'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2'
              )}
            >
              <IconPlus className='mr-2 h-4 w-4' />
              Request New Tool
            </Button>
          </Link>
        </div>

        <Separator className='bg-border' />

        {/* Filters Section */}
        <Filters
          filters={filters}
          onFiltersChange={setFilters}
          categories={[...categories]}
        />

        {/* View Controls */}
        <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-4'>
            <ViewToggle view={viewMode} onViewChange={handleViewChange} />
            <span className='text-muted-foreground text-sm'>
              {totalItems} {totalItems === 1 ? 'tool' : 'tools'} found
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
          {viewMode === 'grid' ? (
            <GridView
              items={paginatedItems}
              onItemClick={handleItemClick}
              isLoading={isLoading}
            />
          ) : (
            <TableView
              items={paginatedItems}
              onItemClick={handleItemClick}
              isLoading={isLoading}
            />
          )}
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
 * ToolsClient - Client Component for AI Tools page
 * Wrapped in Suspense to handle useSearchParams
 */
export default function ToolsClient() {
  return (
    <Suspense
      fallback={
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
                <div className='bg-muted h-7 w-32 animate-pulse rounded' />
                <div className='bg-muted/50 h-4 w-48 animate-pulse rounded' />
              </div>
            </div>
          </div>
        </PageContainer>
      }
    >
      <ToolsClientInner />
    </Suspense>
  );
}
