'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  Star,
  Users,
  Type
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import type { SortDropdownProps, SortField, SortOrder } from './types';

export function SortDropdown({
  sortBy,
  sortOrder,
  onSortChange
}: SortDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('filters');

  const sortOptions: {
    value: SortField;
    label: string;
    icon: React.ElementType;
  }[] = [
    { value: 'name', label: t('name'), icon: Type },
    { value: 'created_at', label: t('dateAdded'), icon: Calendar },
    { value: 'average_rating', label: t('rating'), icon: Star },
    { value: 'usage_count', label: t('popularity'), icon: Users }
  ];

  const selectedOption =
    sortOptions.find((opt) => opt.value === sortBy) ?? sortOptions[3];
  const SelectedIcon = selectedOption.icon;

  const toggleOrder = () => {
    onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortFieldChange = (field: string) => {
    const newOrder: SortOrder = field === 'name' ? 'asc' : 'desc';
    onSortChange(field as SortField, newOrder);
    setOpen(false);
  };

  return (
    <div className='flex items-center gap-1' dir={isRTL ? 'rtl' : 'ltr'}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            aria-label='Sort by'
            className={cn(
              'w-[150px] justify-between',
              'bg-secondary/50',
              'border-border hover:border-foreground/12',
              'hover:bg-secondary',
              'text-foreground',
              'transition-all duration-200'
            )}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className={cn('flex items-center gap-2 truncate')}>
              <SelectedIcon className='text-muted-foreground h-4 w-4 shrink-0' />
              <span className='truncate'>{selectedOption.label}</span>
            </div>
            <ChevronsUpDown className='ms-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn('w-[150px] p-0', 'bg-card', 'border-border')}
          align={isRTL ? 'end' : 'start'}
        >
          <Command>
            <CommandList>
              <CommandEmpty>{t('noResults')}</CommandEmpty>
              <CommandGroup className='p-1'>
                {sortOptions.map((option) => {
                  const OptionIcon = option.icon;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={handleSortFieldChange}
                      className={cn(
                        'cursor-pointer gap-2 px-2 py-1.5',
                        'transition-colors duration-150',
                        sortBy === option.value && 'bg-accent text-foreground'
                      )}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      <OptionIcon className='h-4 w-4 shrink-0' />
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
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
