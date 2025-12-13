'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Wrench, Bot } from 'lucide-react';
import type { CategoryFiltersProps, CategoryType } from './types';

/**
 * CategoryFilters - Filter controls for category listing
 * Includes search input and type toggle (tool/agent)
 */
export function CategoryFilters({
  search,
  onSearchChange,
  type,
  onTypeChange,
  showTypeToggle = true
}: CategoryFiltersProps) {
  const [localSearch, setLocalSearch] = React.useState(search);
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('filters');

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  // Sync local state with prop
  React.useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
        'rounded-xl p-4',
        'bg-card/50 backdrop-blur-[6px]',
        'border-border border'
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Search Input */}
      <div className='relative max-w-md flex-1'>
        <Search
          className={cn(
            'text-muted-foreground absolute top-1/2 h-4 w-4 -translate-y-1/2',
            isRTL ? 'right-3' : 'left-3'
          )}
        />
        <Input
          type='text'
          placeholder={t('searchCategories')}
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className={cn(
            'bg-secondary',
            'border-border focus:border-foreground/20',
            'text-foreground placeholder:text-muted-foreground',
            'transition-all duration-200',
            isRTL ? 'pr-10 pl-4' : 'pr-4 pl-10'
          )}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </div>

      {/* Type Toggle */}
      {showTypeToggle && (
        <div className='flex items-center gap-2'>
          <TypeToggleButton
            type='tool'
            currentType={type}
            onClick={() => onTypeChange('tool')}
            icon={<Wrench className='h-4 w-4' />}
            label={t('allCategories').includes('أدوات') ? 'أدوات' : 'Tools'}
          />
          <TypeToggleButton
            type='agent'
            currentType={type}
            onClick={() => onTypeChange('agent')}
            icon={<Bot className='h-4 w-4' />}
            label={t('allCategories').includes('وكلاء') ? 'وكلاء' : 'Agents'}
          />
        </div>
      )}
    </div>
  );
}

interface TypeToggleButtonProps {
  type: CategoryType;
  currentType: CategoryType;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function TypeToggleButton({
  type,
  currentType,
  onClick,
  icon,
  label
}: TypeToggleButtonProps) {
  const isActive = type === currentType;

  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size='sm'
      onClick={onClick}
      className={cn(
        'gap-2 transition-all duration-200',
        isActive
          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
          : 'border-border text-muted-foreground hover:border-foreground/20 hover:bg-secondary hover:text-foreground bg-transparent'
      )}
    >
      {icon}
      {label}
    </Button>
  );
}
