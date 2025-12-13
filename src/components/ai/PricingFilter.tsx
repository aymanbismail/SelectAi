'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  ChevronsUpDown,
  Gift,
  Zap,
  Crown,
  Building2,
  CircleDollarSign
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
import type { PricingFilterProps, PricingType } from './types';

export function PricingFilter({ value, onChange }: PricingFilterProps) {
  const [open, setOpen] = React.useState(false);
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('filters');

  const pricingOptions: {
    value: PricingType;
    label: string;
    icon: React.ElementType;
  }[] = [
    { value: 'all', label: t('allPricing'), icon: CircleDollarSign },
    { value: 'free', label: t('free'), icon: Gift },
    { value: 'freemium', label: t('freemium'), icon: Zap },
    { value: 'paid', label: t('paid'), icon: Crown },
    { value: 'enterprise', label: t('enterprise'), icon: Building2 }
  ];

  const selectedOption =
    pricingOptions.find((opt) => opt.value === value) ?? pricingOptions[0];
  const SelectedIcon = selectedOption.icon;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          aria-label='Select pricing type'
          className={cn(
            'w-[160px] justify-between',
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
            <SelectedIcon className='text-muted-foreground h-4 w-4 shrink-0' />
            <span className='truncate'>{selectedOption.label}</span>
          </div>
          <ChevronsUpDown className='ms-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-[160px] p-0', 'bg-card', 'border-border')}
        align={isRTL ? 'end' : 'start'}
      >
        <Command>
          <CommandList>
            <CommandEmpty>{t('noResults')}</CommandEmpty>
            <CommandGroup className='p-1'>
              {pricingOptions.map((option) => {
                const OptionIcon = option.icon;
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue as PricingType);
                      setOpen(false);
                    }}
                    className={cn(
                      'cursor-pointer gap-2 px-2 py-1.5',
                      'transition-colors duration-150',
                      value === option.value && 'bg-accent text-foreground'
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
  );
}
