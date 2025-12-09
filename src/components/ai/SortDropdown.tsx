'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  Star,
  Users,
  Type
} from 'lucide-react';
import type { SortDropdownProps, SortField, SortOrder } from './types';

const sortOptions: {
  value: SortField;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: 'name', label: 'Name', icon: Type },
  { value: 'created_at', label: 'Date Added', icon: Calendar },
  { value: 'average_rating', label: 'Rating', icon: Star },
  { value: 'usage_count', label: 'Popularity', icon: Users }
];

export function SortDropdown({
  sortBy,
  sortOrder,
  onSortChange
}: SortDropdownProps) {
  const toggleOrder = () => {
    onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortFieldChange = (field: string) => {
    // Reset to desc when changing field (most relevant for rating/usage)
    const newOrder: SortOrder = field === 'name' ? 'asc' : 'desc';
    onSortChange(field as SortField, newOrder);
  };

  return (
    <div className='flex items-center gap-1'>
      <Select value={sortBy} onValueChange={handleSortFieldChange}>
        <SelectTrigger
          className={cn(
            'w-[150px]',
            'bg-secondary/50',
            'border-border hover:border-foreground/12',
            'text-foreground',
            'transition-all duration-200'
          )}
          aria-label='Sort by'
        >
          <div className='flex items-center gap-2'>
            <ArrowUpDown className='text-muted-foreground h-4 w-4 shrink-0' />
            <SelectValue placeholder='Sort by' />
          </div>
        </SelectTrigger>
        <SelectContent className={cn('bg-card', 'border-border')}>
          {sortOptions.map((option) => {
            const OptionIcon = option.icon;
            return (
              <SelectItem
                key={option.value}
                value={option.value}
                className={cn(
                  'cursor-pointer',
                  'transition-colors duration-150',
                  sortBy === option.value && 'bg-accent text-foreground'
                )}
              >
                <div className='flex items-center gap-2'>
                  <OptionIcon className='h-4 w-4' />
                  {option.label}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button
        variant='outline'
        size='icon'
        onClick={toggleOrder}
        className={cn(
          'h-9 w-9',
          'bg-secondary/50',
          'border-border hover:border-foreground/12',
          'hover:bg-secondary',
          'text-muted-foreground hover:text-foreground',
          'transition-all duration-200'
        )}
        aria-label={sortOrder === 'asc' ? 'Sort ascending' : 'Sort descending'}
      >
        {sortOrder === 'asc' ? (
          <ArrowUp className='h-4 w-4' />
        ) : (
          <ArrowDown className='h-4 w-4' />
        )}
      </Button>
    </div>
  );
}
