'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Table2 } from 'lucide-react';
import type { ViewToggleProps } from './types';

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-lg p-1',
        'bg-secondary/50',
        'border-border border'
      )}
      role='group'
      aria-label='View mode'
    >
      <Button
        variant='ghost'
        size='sm'
        onClick={() => onViewChange('grid')}
        className={cn(
          'h-8 rounded-md px-3',
          'transition-all duration-200',
          view === 'grid'
            ? 'bg-accent text-foreground hover:bg-accent'
            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
        )}
        aria-label='Grid view'
        aria-pressed={view === 'grid'}
      >
        <LayoutGrid className='mr-1.5 h-4 w-4' />
        Grid
      </Button>
      <Button
        variant='ghost'
        size='sm'
        onClick={() => onViewChange('table')}
        className={cn(
          'h-8 rounded-md px-3',
          'transition-all duration-200',
          view === 'table'
            ? 'bg-accent text-foreground hover:bg-accent'
            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
        )}
        aria-label='Table view'
        aria-pressed={view === 'table'}
      >
        <Table2 className='mr-1.5 h-4 w-4' />
        Table
      </Button>
    </div>
  );
}
