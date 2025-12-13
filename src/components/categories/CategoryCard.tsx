'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import type { CategoryCardProps } from './types';
import { AnimatedContainer } from '@/components/animation/animated-container';

/**
 * CategoryCard - Modern card component for displaying a category
 * Features: icon, name, description, count badge, hover effects
 */
export function CategoryCard({
  category,
  onClick,
  index = 0
}: CategoryCardProps & { index?: number }) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const t = useTranslations('categoryPage');
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const count =
    category.type === 'tool' ? category.tools_count : category.agents_count;
  const itemLabel = category.type === 'tool' ? t('tools') : t('agents');
  const exploreLabel =
    category.type === 'tool' ? t('exploreTools') : t('exploreAgents');
  const href =
    category.type === 'tool'
      ? `/${locale}/ai-tools/categories/${category.slug}`
      : `/${locale}/agents/categories/${category.slug}`;

  // Staggered animation: 0.05s delay per card
  const animationDelay = index * 0.05;

  return (
    <AnimatedContainer delay={animationDelay}>
      <Link href={href} onClick={onClick} className='group block h-full'>
        <div
          className={cn(
            'relative h-full overflow-hidden rounded-2xl',
            'bg-card/80 backdrop-blur-[6px]',
            'border-border border',
            'p-6',
            'transition-all duration-300 ease-out',
            'hover:border-border/80 hover:bg-card',
            'hover:shadow-card-hover',
            'hover:-translate-y-1',
            'cursor-pointer',
            isRTL && 'text-right'
          )}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Background gradient on hover */}
          <div
            className={cn(
              'absolute inset-0 opacity-0 transition-opacity duration-300',
              'from-accent/50 to-accent/30 bg-gradient-to-br via-transparent',
              'group-hover:opacity-100'
            )}
          />

          {/* Featured indicator */}
          {category.is_featured && (
            <div className={cn('absolute top-4', isRTL ? 'left-4' : 'right-4')}>
              <Sparkles className='h-4 w-4 text-amber-500' />
            </div>
          )}

          {/* Content */}
          <div className='relative z-10 flex h-full flex-col'>
            {/* Icon and Badge */}
            <div className='mb-4 flex items-start justify-between'>
              <div
                className={cn(
                  'flex h-14 w-14 items-center justify-center',
                  'rounded-xl',
                  'bg-accent',
                  'border-border border',
                  'text-2xl',
                  'transition-all duration-300',
                  'group-hover:bg-accent/80 group-hover:scale-110'
                )}
              >
                {category.icon}
              </div>
              {count !== undefined && count > 0 && (
                <Badge
                  variant='secondary'
                  className={cn(
                    'border-border bg-secondary text-muted-foreground',
                    'transition-colors duration-200',
                    'group-hover:bg-secondary/80 group-hover:text-foreground'
                  )}
                >
                  {count} {itemLabel}
                </Badge>
              )}
            </div>

            {/* Name */}
            <h3
              className={cn(
                'text-foreground text-lg font-semibold',
                'mb-2',
                'transition-colors duration-200'
              )}
            >
              {category.name}
            </h3>

            {/* Description */}
            <p
              className={cn(
                'text-muted-foreground text-sm leading-relaxed',
                'flex-1',
                'line-clamp-3'
              )}
            >
              {category.description}
            </p>

            {/* Footer */}
            <div
              className={cn(
                'mt-4 pt-4',
                'border-border border-t',
                'flex items-center justify-between'
              )}
            >
              <span
                className={cn(
                  'text-muted-foreground text-sm font-medium',
                  'flex items-center gap-1.5',
                  'transition-all duration-200',
                  'group-hover:text-foreground group-hover:gap-2.5'
                )}
              >
                {exploreLabel}
                <ArrowIcon className='h-4 w-4' />
              </span>
              <Badge
                variant='outline'
                className={cn(
                  'text-xs capitalize',
                  'border-border text-muted-foreground',
                  'group-hover:border-border/80 group-hover:text-foreground'
                )}
              >
                {category.type}
              </Badge>
            </div>
          </div>
        </div>
      </Link>
    </AnimatedContainer>
  );
}
