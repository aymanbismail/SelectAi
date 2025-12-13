'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { SearchInput } from './SearchInput';
import { CategoryFilter } from './CategoryFilter';
import { PricingFilter } from './PricingFilter';
import { SortDropdown } from './SortDropdown';
import { FeaturedSwitch } from './FeaturedSwitch';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import type { FiltersProps, FilterState } from './types';

const defaultFilters: FilterState = {
  search: '',
  category: 'all',
  pricing_type: 'all',
  featured_only: false,
  sort_by: 'usage_count',
  sort_order: 'desc'
};

export function Filters({
  filters,
  onFiltersChange,
  categories,
  showCategoryFilter = true
}: FiltersProps & { showCategoryFilter?: boolean }) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('filters');

  const hasActiveFilters =
    filters.search !== '' ||
    filters.category !== 'all' ||
    filters.pricing_type !== 'all' ||
    filters.featured_only;

  const handleReset = () => {
    onFiltersChange(defaultFilters);
  };

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-xl p-4',
        'bg-card/50',
        'border-border border'
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Top row: Search + Featured Switch */}
      <div
        className={cn(
          'flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'
        )}
      >
        <SearchInput
          value={filters.search}
          onChange={(value) => updateFilter('search', value)}
          placeholder={t('search')}
        />
        <FeaturedSwitch
          checked={filters.featured_only}
          onCheckedChange={(checked) => updateFilter('featured_only', checked)}
        />
      </div>

      {/* Bottom row: Category, Pricing, Sort, Reset */}
      <div className={cn('flex flex-wrap items-center gap-3')}>
        {showCategoryFilter && (
          <CategoryFilter
            value={filters.category}
            onChange={(value) => updateFilter('category', value)}
            categories={categories}
          />
        )}
        <PricingFilter
          value={filters.pricing_type}
          onChange={(value) => updateFilter('pricing_type', value)}
        />
        <div className='flex-1' />
        <SortDropdown
          sortBy={filters.sort_by}
          sortOrder={filters.sort_order}
          onSortChange={(field, order) => {
            onFiltersChange({
              ...filters,
              sort_by: field,
              sort_order: order
            });
          }}
        />
        {hasActiveFilters && (
          <Button
            variant='ghost'
            size='sm'
            onClick={handleReset}
            className={cn(
              'text-muted-foreground hover:text-foreground',
              'hover:bg-secondary',
              'transition-colors duration-200'
            )}
          >
            <RotateCcw className='me-1.5 h-4 w-4' />
            {t('reset')}
          </Button>
        )}
      </div>
    </div>
  );
}

export { defaultFilters };
