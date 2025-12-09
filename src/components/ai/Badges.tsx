'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Star,
  Sparkles,
  Crown,
  Zap,
  Gift,
  Building2
} from 'lucide-react';

// Badge variants for different purposes
interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <Badge
      variant='secondary'
      className={cn(
        'border-border bg-secondary text-foreground',
        'rounded-md px-2.5 py-0.5 text-xs font-medium',
        'hover:bg-secondary/80',
        'transition-colors duration-200',
        className
      )}
    >
      {category}
    </Badge>
  );
}

interface PricingBadgeProps {
  pricingType: 'free' | 'freemium' | 'paid' | 'enterprise';
  className?: string;
}

const pricingConfig = {
  free: {
    label: 'Free',
    icon: Gift,
    className:
      'bg-[rgba(52,211,153,0.15)] text-[#34D399] border-[rgba(52,211,153,0.20)] hover:bg-[rgba(52,211,153,0.20)]'
  },
  freemium: {
    label: 'Freemium',
    icon: Zap,
    className:
      'bg-[rgba(99,102,241,0.15)] text-[#818CF8] border-[rgba(99,102,241,0.20)] hover:bg-[rgba(99,102,241,0.20)]'
  },
  paid: {
    label: 'Paid',
    icon: Crown,
    className:
      'bg-[rgba(239,68,68,0.15)] text-[#EF4444] border-[rgba(239,68,68,0.20)] hover:bg-[rgba(239,68,68,0.20)]'
  },
  enterprise: {
    label: 'Enterprise',
    icon: Building2,
    className:
      'bg-[rgba(168,85,247,0.15)] text-[#A855F7] border-[rgba(168,85,247,0.20)] hover:bg-[rgba(168,85,247,0.20)]'
  }
};

export function PricingBadge({ pricingType, className }: PricingBadgeProps) {
  const config = pricingConfig[pricingType];
  const Icon = config.icon;

  return (
    <Badge
      variant='outline'
      className={cn(
        'gap-1 rounded-md px-2 py-0.5 text-xs font-medium',
        'transition-colors duration-200',
        config.className,
        className
      )}
    >
      <Icon className='h-3 w-3' />
      {config.label}
    </Badge>
  );
}

interface VerifiedBadgeProps {
  className?: string;
}

export function VerifiedBadge({ className }: VerifiedBadgeProps) {
  return (
    <Badge
      variant='outline'
      className={cn(
        'border-[rgba(59,130,246,0.20)] bg-[rgba(59,130,246,0.15)] text-[#3B82F6]',
        'hover:bg-[rgba(59,130,246,0.20)]',
        'gap-1 rounded-md px-2 py-0.5 text-xs font-medium',
        'transition-colors duration-200',
        className
      )}
    >
      <CheckCircle2 className='h-3 w-3' />
      Verified
    </Badge>
  );
}

interface FeaturedBadgeProps {
  className?: string;
}

export function FeaturedBadge({ className }: FeaturedBadgeProps) {
  return (
    <Badge
      variant='outline'
      className={cn(
        'bg-[rgba(251,191,36,0.15)] text-[#FBBF24]',
        'border-[rgba(251,191,36,0.20)] hover:border-[rgba(251,191,36,0.30)]',
        'gap-1 rounded-md px-2 py-0.5 text-xs font-medium',
        'transition-all duration-200',
        className
      )}
    >
      <Sparkles className='h-3 w-3' />
      Featured
    </Badge>
  );
}

interface RatingBadgeProps {
  rating: number;
  className?: string;
}

export function RatingBadge({ rating, className }: RatingBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 text-xs font-medium',
        'text-muted-foreground',
        className
      )}
    >
      <Star className='fill-muted-foreground text-muted-foreground h-3.5 w-3.5' />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
}

interface UsageCountBadgeProps {
  count: number;
  className?: string;
}

export function UsageCountBadge({ count, className }: UsageCountBadgeProps) {
  const formatCount = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  return (
    <span className={cn('text-muted-foreground text-xs', className)}>
      {formatCount(count)} uses
    </span>
  );
}

// Combined badges display component
interface BadgesDisplayProps {
  category?: string;
  pricingType?: 'free' | 'freemium' | 'paid' | 'enterprise';
  isVerified?: boolean;
  isFeatured?: boolean;
  rating?: number;
  usageCount?: number;
  showAll?: boolean;
  className?: string;
}

export function BadgesDisplay({
  category,
  pricingType,
  isVerified,
  isFeatured,
  rating,
  usageCount,
  showAll = false,
  className
}: BadgesDisplayProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {isFeatured && <FeaturedBadge />}
      {isVerified && <VerifiedBadge />}
      {category && <CategoryBadge category={category} />}
      {pricingType && <PricingBadge pricingType={pricingType} />}
      {showAll && rating !== undefined && <RatingBadge rating={rating} />}
      {showAll && usageCount !== undefined && (
        <UsageCountBadge count={usageCount} />
      )}
    </div>
  );
}
