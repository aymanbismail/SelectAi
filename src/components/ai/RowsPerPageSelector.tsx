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
import { Rows3 } from 'lucide-react';
import type { RowsPerPageSelectorProps } from './types';

const defaultOptions = [10, 20, 30, 50, 100];

export function RowsPerPageSelector({
  value,
  onChange,
  options = defaultOptions
}: RowsPerPageSelectorProps) {
  return (
    <div className='flex items-center gap-2'>
      <Rows3 className='text-muted-foreground h-4 w-4' />
      <span className='text-muted-foreground text-sm whitespace-nowrap'>
        Per page:
      </span>
      <Select
        value={value.toString()}
        onValueChange={(val) => onChange(parseInt(val, 10))}
      >
        <SelectTrigger
          className={cn(
            'h-9 w-[80px]',
            'bg-background/60 backdrop-blur-sm',
            'border-border/50 hover:border-border/80',
            'transition-all duration-200'
          )}
          aria-label='Select rows per page'
        >
          <SelectValue placeholder={value.toString()} />
        </SelectTrigger>
        <SelectContent
          className={cn('bg-card backdrop-blur-md', 'border-border')}
        >
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option.toString()}
              className={cn(
                'cursor-pointer',
                'transition-colors duration-150',
                value === option && 'bg-accent text-foreground'
              )}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
