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
import { Gift, Zap, Crown, Building2, CircleDollarSign } from 'lucide-react';
import type { PricingFilterProps, PricingType } from './types';

const pricingOptions: {
  value: PricingType;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: 'all', label: 'All Pricing', icon: CircleDollarSign },
  { value: 'free', label: 'Free', icon: Gift },
  { value: 'freemium', label: 'Freemium', icon: Zap },
  { value: 'paid', label: 'Paid', icon: Crown },
  { value: 'enterprise', label: 'Enterprise', icon: Building2 }
];

export function PricingFilter({ value, onChange }: PricingFilterProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as PricingType)}>
      <SelectTrigger
        className={cn(
          'w-[160px]',
          'bg-secondary/50',
          'border-border hover:border-foreground/12',
          'text-foreground',
          'transition-all duration-200',
          value !== 'all' && 'border-foreground/20 text-foreground'
        )}
        aria-label='Select pricing type'
      >
        <SelectValue placeholder='Pricing' />
      </SelectTrigger>
      <SelectContent className={cn('bg-card', 'border-border')}>
        {pricingOptions.map((option) => {
          const OptionIcon = option.icon;
          return (
            <SelectItem
              key={option.value}
              value={option.value}
              className={cn(
                'cursor-pointer',
                'transition-colors duration-150',
                value === option.value && 'bg-accent text-foreground'
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
  );
}
