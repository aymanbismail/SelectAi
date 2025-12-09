'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';
import type { FeaturedSwitchProps } from './types';

export function FeaturedSwitch({
  checked,
  onCheckedChange
}: FeaturedSwitchProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg px-3 py-2',
        'bg-secondary/50',
        'border-border border',
        'transition-all duration-200',
        checked && 'border-[rgba(251,191,36,0.30)] bg-[rgba(251,191,36,0.08)]'
      )}
    >
      <Switch
        id='featured-switch'
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn(
          'data-[state=checked]:bg-[#FBBF24]',
          'transition-colors duration-200'
        )}
        aria-label='Show featured only'
      />
      <Label
        htmlFor='featured-switch'
        className={cn(
          'flex cursor-pointer items-center gap-1.5 text-sm font-medium',
          'text-muted-foreground transition-colors duration-200',
          checked && 'text-[#FBBF24]'
        )}
      >
        <Sparkles className={cn('h-4 w-4', checked && 'fill-[#FBBF24]')} />
        Featured Only
      </Label>
    </div>
  );
}
