'use client';

import * as React from 'react';
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
    >
      {/* Search Input */}
      <div className='relative max-w-md flex-1'>
        <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
        <Input
          type='text'
          placeholder='Search categories...'
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className={cn(
            'pr-4 pl-10',
            'bg-secondary',
            'border-border focus:border-foreground/20',
            'text-foreground placeholder:text-muted-foreground',
            'transition-all duration-200'
          )}
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
            label='Tools'
          />
          <TypeToggleButton
            type='agent'
            currentType={type}
            onClick={() => onTypeChange('agent')}
            icon={<Bot className='h-4 w-4' />}
            label='Agents'
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
