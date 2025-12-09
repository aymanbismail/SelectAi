'use client';

import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { AnimatedCounter } from './animated-counter';

interface FeatureCard {
  number: string;
  title: string;
  description: string;
}

export function FeaturesSection() {
  const t = useTranslations('features');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const features: FeatureCard[] = [
    {
      number: t('card1.number'),
      title: t('card1.title'),
      description: t('card1.description')
    },
    {
      number: t('card2.number'),
      title: t('card2.title'),
      description: t('card2.description')
    },
    {
      number: t('card3.number'),
      title: t('card3.title'),
      description: t('card3.description')
    }
  ];

  return (
    <section className='relative w-full overflow-x-hidden py-12 sm:py-20 lg:py-32'>
      <div className='mx-auto max-w-7xl px-3 sm:px-4'>
        <div className='particle-container relative'>
          {/* Bento Grid Layout */}
          <div
            className={cn(
              'grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6',
              isRTL && 'lg:grid-flow-dense'
            )}
          >
            {/* Left Column: Two Stacked Cards (Right in RTL) */}
            <div
              className={cn(
                'flex flex-col gap-4 lg:gap-6',
                isRTL && 'lg:order-2'
              )}
            >
              {/* Card 1 - Top Left */}
              <div
                className={cn(
                  'group border-border bg-card/80 hover:border-border/80 hover:bg-card relative overflow-hidden rounded-xl border p-4 backdrop-blur-[6px] transition-all duration-500 sm:rounded-2xl sm:p-6 lg:rounded-3xl lg:p-8',
                  isRTL && 'text-right'
                )}
              >
                {/* Number */}
                <AnimatedCounter
                  value={features[0].number}
                  className='text-foreground mb-3 text-4xl leading-none font-black tracking-tight sm:mb-4 sm:text-5xl md:text-6xl lg:text-7xl'
                  duration={2000}
                />

                {/* Title */}
                <h3 className='text-foreground mb-2 text-lg leading-tight font-bold sm:mb-3 sm:text-xl md:text-2xl lg:text-3xl'>
                  {features[0].title}
                </h3>

                {/* Description */}
                <p className='text-muted-foreground text-xs leading-relaxed sm:text-sm md:text-base lg:text-lg'>
                  {features[0].description}
                </p>
              </div>

              {/* Card 2 - Bottom Left */}
              <div
                className={cn(
                  'group border-border bg-card/80 hover:border-border/80 hover:bg-card relative overflow-hidden rounded-xl border p-4 backdrop-blur-[6px] transition-all duration-500 sm:rounded-2xl sm:p-6 lg:rounded-3xl lg:p-8',
                  isRTL && 'text-right'
                )}
              >
                {/* Number */}
                <AnimatedCounter
                  value={features[1].number}
                  className='text-foreground mb-3 text-4xl leading-none font-black tracking-tight sm:mb-4 sm:text-5xl md:text-6xl lg:text-7xl'
                  duration={2000}
                />

                {/* Title */}
                <h3 className='text-foreground mb-2 text-lg leading-tight font-bold sm:mb-3 sm:text-xl md:text-2xl lg:text-3xl'>
                  {features[1].title}
                </h3>

                {/* Description */}
                <p className='text-muted-foreground text-xs leading-relaxed sm:text-sm md:text-base lg:text-lg'>
                  {features[1].description}
                </p>
              </div>
            </div>

            {/* Right Column: One Tall Card (Left in RTL) */}
            <div
              className={cn(
                'group border-border bg-card/80 hover:border-border/80 hover:bg-card relative flex flex-col justify-center overflow-hidden rounded-xl border p-4 backdrop-blur-[6px] transition-all duration-500 sm:rounded-2xl sm:p-6 lg:rounded-3xl lg:p-8',
                isRTL && 'text-right lg:order-1'
              )}
            >
              {/* Number */}
              <AnimatedCounter
                value={features[2].number}
                className='text-foreground mb-3 text-4xl leading-none font-black tracking-tight sm:mb-4 sm:text-5xl md:text-6xl lg:text-7xl'
                duration={2000}
              />

              {/* Title */}
              <h3 className='text-foreground mb-2 text-lg leading-tight font-bold sm:mb-3 sm:text-xl md:text-2xl lg:text-3xl'>
                {features[2].title}
              </h3>

              {/* Description */}
              <p className='text-muted-foreground text-xs leading-relaxed sm:text-sm md:text-base lg:text-lg'>
                {features[2].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
