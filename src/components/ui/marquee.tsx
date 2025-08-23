'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
  rtl?: boolean; // logical direction
}

export function Marquee({
  children,
  direction = 'left',
  speed = 50,
  className,
  pauseOnHover = true,
  rtl = false
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        className,
        rtl && 'direction-rtl'
      )}
    >
      {/* Fade gradients (logical start/end) */}
      <div
        className={cn(
          'from-background/40 pointer-events-none absolute inset-y-0 z-10 w-12 bg-gradient-to-r to-transparent',
          rtl ? 'right-0 bg-gradient-to-l' : 'left-0'
        )}
      />
      <div
        className={cn(
          'from-background/40 pointer-events-none absolute inset-y-0 z-10 w-12 bg-gradient-to-l to-transparent',
          rtl ? 'left-0 bg-gradient-to-r' : 'right-0'
        )}
      />

      <div
        className={cn(
          'animate-marquee flex w-max min-w-full gap-4',
          direction === 'right' && 'animate-marquee-reverse',
          pauseOnHover && 'hover:[animation-play-state:paused]',
          rtl && 'flex-row-reverse'
        )}
        style={
          {
            '--marquee-duration': `${speed}s`
          } as React.CSSProperties
        }
      >
        {/* First set of items */}
        <div className={cn('flex shrink-0 gap-4', rtl && 'flex-row-reverse')}>
          {children}
        </div>
        {/* Duplicate set for seamless infinite scroll */}
        <div className={cn('flex shrink-0 gap-4', rtl && 'flex-row-reverse')}>
          {children}
        </div>
      </div>
    </div>
  );
}
