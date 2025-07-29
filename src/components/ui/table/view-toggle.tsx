'use client';

import * as React from 'react';
import { LayoutGrid, Table2 } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

type ViewMode = 'table' | 'cards';

interface ViewToggleProps {
  value: ViewMode;
  onValueChange: (value: ViewMode) => void;
  className?: string;
}

export function ViewToggle({
  value,
  onValueChange,
  className
}: ViewToggleProps) {
  return (
    <div
      className={cn(
        'flex items-center space-x-1 rounded-md border p-1',
        className
      )}
    >
      <Toggle
        variant='outline'
        size='sm'
        pressed={value === 'table'}
        onPressedChange={(pressed) => pressed && onValueChange('table')}
        aria-label='Table view'
        className='h-7 w-7 p-0'
      >
        <Table2 className='h-4 w-4' />
      </Toggle>
      <Toggle
        variant='outline'
        size='sm'
        pressed={value === 'cards'}
        onPressedChange={(pressed) => pressed && onValueChange('cards')}
        aria-label='Cards view'
        className='h-7 w-7 p-0'
      >
        <LayoutGrid className='h-4 w-4' />
      </Toggle>
    </div>
  );
}
