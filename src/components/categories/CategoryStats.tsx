'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Layers, Package, Bot, Headphones } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import type { CategoryStatsProps } from './types';

/**
 * CategoryStats - Statistics cards for category pages
 * Shows total categories, total items, and support availability
 */
export function CategoryStats({
  totalCategories,
  totalItems,
  type
}: CategoryStatsProps) {
  const locale = useLocale();
  const t = useTranslations('categoryPage');
  const isRTL = locale === 'ar';

  const itemLabel =
    type === 'tool' ? t('availableTools') : t('availableAgents');
  const ItemIcon = type === 'tool' ? Package : Bot;

  return (
    <div
      className='grid grid-cols-1 gap-6 md:grid-cols-3'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Total Categories */}
      <Card
        className={cn(
          'bg-card/50 backdrop-blur-[6px]',
          'border-border border',
          'hover:bg-card transition-all duration-300 hover:shadow-lg'
        )}
      >
        <CardHeader className='text-center'>
          <div className='mx-auto mb-2'>
            <Layers className='text-foreground h-6 w-6' />
          </div>
          <CardTitle
            className={cn(
              'text-foreground text-2xl font-bold tabular-nums md:text-3xl'
            )}
          >
            {totalCategories}
          </CardTitle>
          <CardDescription className='text-muted-foreground'>
            {t('totalCategories')}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Total Items */}
      <Card
        className={cn(
          'bg-card/50 backdrop-blur-[6px]',
          'border-border border',
          'hover:bg-card transition-all duration-300 hover:shadow-lg'
        )}
      >
        <CardHeader className='text-center'>
          <div className='mx-auto mb-2'>
            <ItemIcon className='text-foreground h-6 w-6' />
          </div>
          <CardTitle
            className={cn(
              'text-foreground text-2xl font-bold tabular-nums md:text-3xl'
            )}
          >
            {totalItems}+
          </CardTitle>
          <CardDescription className='text-muted-foreground'>
            {itemLabel}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Support */}
      <Card
        className={cn(
          'bg-card/50 backdrop-blur-[6px]',
          'border-border border',
          'hover:bg-card transition-all duration-300 hover:shadow-lg'
        )}
      >
        <CardHeader className='text-center'>
          <div className='mx-auto mb-2'>
            <Headphones className='text-foreground h-6 w-6' />
          </div>
          <CardTitle
            className={cn(
              'text-foreground text-2xl font-bold tabular-nums md:text-3xl'
            )}
          >
            24/7
          </CardTitle>
          <CardDescription className='text-muted-foreground'>
            {t('supportAvailable')}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
