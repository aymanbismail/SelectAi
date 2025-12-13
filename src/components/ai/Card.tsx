'use client';

import * as React from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  CategoryBadge,
  PricingBadge,
  VerifiedBadge,
  FeaturedBadge,
  RatingBadge,
  UsageCountBadge
} from './Badges';
import { ExternalLink } from 'lucide-react';
import type { CardProps } from './types';
import { AnimatedContainer } from '@/components/animation/animated-container';

export function Card({
  item,
  onClick,
  index = 0
}: CardProps & { index?: number }) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const {
    name,
    short_description,
    category,
    pricing_type,
    logo_url,
    icon,
    average_rating,
    usage_count,
    is_featured,
    is_verified
  } = item;

  // Staggered animation: 0.05s delay per card
  const animationDelay = index * 0.05;

  return (
    <AnimatedContainer delay={animationDelay}>
      <div
        className={cn(
          'group relative flex h-full flex-col',
          // Premium glass card style
          'rounded-xl',
          'bg-card/80',
          'backdrop-blur-[6px]',
          'border-border border',
          'shadow-sm',
          // Hover effects - subtle and premium
          'hover:shadow-md',
          'hover:border-border/80',
          'hover:scale-[1.01]',
          'transition-all duration-200',
          // Focus effects
          'focus-within:border-ring',
          'focus-within:ring-ring focus-within:ring-1'
        )}
      >
        <div
          className={cn('relative flex h-full flex-col p-5')}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Top section: Logo + Badges */}
          <div className={cn('mb-4 flex items-start justify-between gap-4')}>
            {/* Logo */}
            <div
              className={cn(
                'flex items-center justify-center',
                'h-14 w-14 rounded-xl',
                'bg-accent',
                'border-border border',
                'transition-all duration-200',
                'group-hover:bg-accent/80',
                'group-hover:border-border/80'
              )}
            >
              {logo_url ? (
                <Image
                  src={logo_url}
                  alt={`${name} logo`}
                  width={32}
                  height={32}
                  className='rounded-lg object-cover'
                />
              ) : (
                <span className='text-foreground text-2xl'>
                  {icon || name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* Featured + Verified badges */}
            <div className='flex flex-wrap items-center gap-1.5'>
              {is_featured && <FeaturedBadge />}
              {is_verified && <VerifiedBadge />}
            </div>
          </div>

          {/* Title + Description */}
          <div className='mb-4 flex-1'>
            <h3
              className={cn(
                'mb-1.5 text-lg font-semibold tracking-tight',
                'text-foreground',
                'line-clamp-1',
                'group-hover:text-foreground/80',
                'transition-colors duration-200'
              )}
            >
              {name}
            </h3>
            <p
              className={cn(
                'text-muted-foreground text-sm',
                'line-clamp-2 leading-relaxed'
              )}
            >
              {short_description}
            </p>
          </div>

          {/* Category + Pricing badges */}
          <div className={cn('mb-4 flex flex-wrap items-center gap-2')}>
            <CategoryBadge category={category} />
            <PricingBadge pricingType={pricing_type} />
          </div>

          {/* Bottom section: Stats + CTA */}
          <div
            className={cn(
              'border-border flex items-center justify-between border-t pt-4'
            )}
          >
            {/* Stats */}
            <div className={cn('flex items-center gap-4')}>
              <RatingBadge rating={average_rating} />
              <UsageCountBadge count={usage_count} />
            </div>

            {/* CTA Button */}
            <Button
              variant='outline'
              size='sm'
              onClick={onClick}
              className={cn(
                'border-border bg-accent/50',
                'text-foreground/80 hover:text-foreground',
                'hover:border-border/80 hover:bg-accent',
                'transition-all duration-200'
              )}
            >
              <ExternalLink className='h-3.5 w-3.5' />
            </Button>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
}
