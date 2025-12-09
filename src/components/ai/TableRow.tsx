'use client';

import * as React from 'react';
import Image from 'next/image';
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
import { ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import type { TableRowProps } from './types';

export function TableRow({ item, onClick }: TableRowProps) {
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

  return (
    <tr
      className={cn(
        'group border-border border-b last:border-b-0',
        'transition-colors duration-200',
        'hover:bg-secondary'
      )}
    >
      {/* Tool/Agent Info Column */}
      <td className='px-4 py-4'>
        <div className='flex items-center gap-4'>
          {/* Logo */}
          <div
            className={cn(
              'flex shrink-0 items-center justify-center',
              'h-12 w-12 rounded-xl',
              'bg-secondary',
              'border-border border',
              'transition-all duration-200',
              'group-hover:bg-accent'
            )}
          >
            {logo_url ? (
              <Image
                src={logo_url}
                alt={`${name} logo`}
                width={28}
                height={28}
                className='rounded-lg object-cover'
              />
            ) : (
              <span className='text-foreground text-lg'>
                {icon || name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Name + Description */}
          <div className='min-w-0 flex-1'>
            <div className='mb-0.5 flex items-center gap-2'>
              <h4
                className={cn(
                  'text-foreground truncate font-semibold',
                  'group-hover:text-foreground/90',
                  'transition-colors duration-200'
                )}
              >
                {name}
              </h4>
              {/* Mobile badges */}
              <div className='flex items-center gap-1 sm:hidden'>
                {is_featured && (
                  <Sparkles className='h-3.5 w-3.5 text-[#FBBF24]' />
                )}
                {is_verified && (
                  <CheckCircle2 className='h-3.5 w-3.5 text-[#3B82F6]' />
                )}
              </div>
            </div>
            <p
              className={cn(
                'text-muted-foreground text-sm',
                'line-clamp-1 sm:line-clamp-2'
              )}
            >
              {short_description}
            </p>
          </div>
        </div>
      </td>

      {/* Category Column - Hidden on mobile */}
      <td className='hidden px-4 py-4 md:table-cell'>
        <CategoryBadge category={category} />
      </td>

      {/* Pricing Column - Hidden on mobile */}
      <td className='hidden px-4 py-4 lg:table-cell'>
        <PricingBadge pricingType={pricing_type} />
      </td>

      {/* Badges Column - Hidden on mobile */}
      <td className='hidden px-4 py-4 sm:table-cell'>
        <div className='flex items-center gap-1.5'>
          {is_featured && <FeaturedBadge />}
          {is_verified && <VerifiedBadge />}
        </div>
      </td>

      {/* Rating Column */}
      <td className='hidden px-4 py-4 xl:table-cell'>
        <RatingBadge rating={average_rating} />
      </td>

      {/* Usage Column - Hidden on tablet and below */}
      <td className='hidden px-4 py-4 xl:table-cell'>
        <UsageCountBadge count={usage_count} />
      </td>

      {/* Actions Column */}
      <td className='px-4 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={onClick}
          className={cn(
            'border-border bg-secondary',
            'text-foreground/90 hover:text-foreground',
            'hover:border-foreground/20 hover:bg-accent',
            'transition-all duration-200',
            'whitespace-nowrap'
          )}
        >
          <span className='hidden sm:inline'>View</span>
          <ExternalLink className='h-3.5 w-3.5 sm:ml-1.5' />
        </Button>
      </td>
    </tr>
  );
}

// Mobile-optimized card row for responsive design
export function TableRowMobile({ item, onClick }: TableRowProps) {
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

  return (
    <div
      className={cn(
        'rounded-xl p-4',
        'bg-card/50',
        'border-border border',
        'transition-all duration-200',
        'hover:border-foreground/10',
        'hover:bg-card'
      )}
    >
      <div className='flex items-start gap-3'>
        {/* Logo */}
        <div
          className={cn(
            'flex shrink-0 items-center justify-center',
            'h-12 w-12 rounded-xl',
            'bg-secondary',
            'border-border border'
          )}
        >
          {logo_url ? (
            <Image
              src={logo_url}
              alt={`${name} logo`}
              width={28}
              height={28}
              className='rounded-lg object-cover'
            />
          ) : (
            <span className='text-foreground text-lg'>
              {icon || name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* Content */}
        <div className='min-w-0 flex-1'>
          <div className='mb-1 flex items-center gap-2'>
            <h4 className='text-foreground truncate font-semibold'>{name}</h4>
            {is_featured && (
              <Sparkles className='h-3.5 w-3.5 shrink-0 text-[#FBBF24]' />
            )}
            {is_verified && (
              <CheckCircle2 className='h-3.5 w-3.5 shrink-0 text-[#3B82F6]' />
            )}
          </div>
          <p className='text-muted-foreground mb-3 line-clamp-2 text-sm'>
            {short_description}
          </p>

          {/* Badges */}
          <div className='mb-3 flex flex-wrap items-center gap-2'>
            <CategoryBadge category={category} />
            <PricingBadge pricingType={pricing_type} />
          </div>

          {/* Stats + Action */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <RatingBadge rating={average_rating} />
              <UsageCountBadge count={usage_count} />
            </div>
            <Button
              variant='outline'
              size='sm'
              onClick={onClick}
              className={cn(
                'border-border bg-secondary',
                'text-foreground/90 hover:text-foreground',
                'hover:border-foreground/20 hover:bg-accent',
                'transition-all duration-200'
              )}
            >
              View
              <ExternalLink className='ml-1.5 h-3.5 w-3.5' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
