'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SearchInputProps } from './types';

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...'
}: SearchInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = React.useState(value);
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Sync local value with prop
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    // Debounce the onChange callback
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      onChange(newValue);
    }, 300);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
    inputRef.current?.focus();
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className='relative w-full max-w-sm' dir={isRTL ? 'rtl' : 'ltr'}>
      <Search
        className={cn(
          'absolute top-1/2 h-4 w-4 -translate-y-1/2',
          'text-muted-foreground transition-colors duration-200',
          localValue && 'text-foreground',
          isRTL ? 'right-3' : 'left-3'
        )}
      />
      <Input
        ref={inputRef}
        type='text'
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'h-10',
          'bg-secondary/50',
          'border-border hover:border-foreground/12',
          'focus-visible:border-foreground/20 focus-visible:ring-ring/30',
          'placeholder:text-muted-foreground',
          'text-foreground',
          'transition-all duration-200',
          isRTL ? 'pr-10 pl-10' : 'pr-10 pl-10'
        )}
        aria-label='Search'
        dir={isRTL ? 'rtl' : 'ltr'}
      />
      {localValue && (
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={handleClear}
          className={cn(
            'absolute top-1/2 -translate-y-1/2',
            'h-8 w-8 rounded-md',
            'text-muted-foreground hover:text-foreground',
            'hover:bg-secondary',
            'transition-colors duration-200',
            isRTL ? 'left-1' : 'right-1'
          )}
          aria-label='Clear search'
        >
          <X className='h-4 w-4' />
        </Button>
      )}
    </div>
  );
}
