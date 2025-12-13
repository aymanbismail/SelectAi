'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronsUpDown, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import type { CategoryFilterProps } from './types';

export function CategoryFilter({
  value,
  onChange,
  categories
}: CategoryFilterProps) {
  const [open, setOpen] = React.useState(false);
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('filters');

  const allCategories = [
    { value: 'all', label: t('allCategories') },
    ...categories.map((cat) => ({ value: cat, label: cat }))
  ];

  const selectedCategory =
    allCategories.find((cat) => cat.value === value) ?? allCategories[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          aria-label='Select category'
          className={cn(
            'w-[200px] justify-between',
            'bg-secondary/50',
            'border-border hover:border-foreground/12',
            'hover:bg-secondary',
            'text-foreground',
            'transition-all duration-200',
            value !== 'all' && 'border-foreground/20 text-foreground'
          )}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className={cn('flex items-center gap-2 truncate')}>
            <Layers className='text-muted-foreground h-4 w-4 shrink-0' />
            <span className='truncate'>{selectedCategory?.label}</span>
          </div>
          <ChevronsUpDown className='ms-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-[200px] p-0', 'bg-card', 'border-border')}
        align={isRTL ? 'end' : 'start'}
      >
        <Command>
          <CommandInput
            placeholder={t('searchCategories')}
            className='h-9'
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          <CommandList>
            <CommandEmpty>{t('noResults')}</CommandEmpty>
            <CommandGroup className='p-1'>
              {allCategories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? 'all' : currentValue);
                    setOpen(false);
                  }}
                  className={cn(
                    'cursor-pointer gap-2 px-2 py-1.5',
                    'transition-colors duration-150',
                    value === category.value && 'bg-accent text-foreground'
                  )}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  {category.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
