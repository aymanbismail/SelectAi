'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { Sparkles, Bot } from 'lucide-react';
import type { CategoryType } from './types';

interface CategoryHeaderProps {
  type: CategoryType;
  title?: string;
  description?: string;
}

/**
 * CategoryHeader - Shared header component for category pages
 * Displays title, description, icon, and action button
 */
export function CategoryHeader({
  type,
  title,
  description
}: CategoryHeaderProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('categoryPage');
  const isTools = type === 'tool';

  const defaultTitle = isTools ? t('toolCategories') : t('agentCategories');
  const defaultDescription = isTools
    ? t('toolCategoriesDesc')
    : t('agentCategoriesDesc');

  const Icon = isTools ? Sparkles : Bot;
  const requestUrl = isTools
    ? `/${locale}/tools/categories/new`
    : `/${locale}/agents/categories/new`;

  return (
    <div
      className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className='flex items-center gap-3'>
        <div
          className={cn(
            'flex items-center justify-center',
            'h-12 w-12 rounded-xl',
            'bg-secondary',
            'border-border border'
          )}
        >
          <Icon className='text-foreground h-6 w-6' />
        </div>
        <div>
          <h1 className='text-foreground text-2xl font-bold tracking-tight'>
            {title || defaultTitle}
          </h1>
          <p className='text-muted-foreground'>
            {description || defaultDescription}
          </p>
        </div>
      </div>
      <Link href={requestUrl}>
        <Button
          className={cn(
            'bg-primary hover:bg-primary/90',
            'text-primary-foreground',
            'transition-all duration-200',
            'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2'
          )}
        >
          <IconPlus className='me-2 h-4 w-4' />
          {t('requestCategory')}
        </Button>
      </Link>
    </div>
  );
}
