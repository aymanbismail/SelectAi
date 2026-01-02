'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedContainer } from '@/components/animation/animated-container';

export function HeroCTASection() {
  const t = useTranslations('heroCTA');

  return (
    <section className='relative w-full overflow-x-hidden py-12 sm:py-20 lg:py-32'>
      {/* Container */}
      <div className='mx-auto max-w-7xl px-3 sm:px-4'>
        {/* Hero Card with Glass Effect */}
        <AnimatedContainer delay={0.1}>
          <div className='border-border bg-card/80 shadow-elevated relative mx-auto flex flex-col items-center gap-4 overflow-hidden rounded-3xl border p-8 text-center backdrop-blur-[10px] transition-all duration-300 select-none sm:gap-6 sm:rounded-[50px] sm:p-12 md:p-16'>
            {/* Subtle gradient overlay */}
            <div
              className='pointer-events-none absolute inset-0 z-[1] opacity-30'
              style={{
                background:
                  'radial-gradient(ellipse at top, var(--accent) 0%, transparent 60%)'
              }}
            />

            {/* Content */}
            <div className='relative z-10 flex flex-col items-center gap-4 sm:gap-6'>
              {/* Title */}
              <h2 className='text-foreground text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl'>
                {t('title')}
              </h2>

              {/* Subtitle */}
              <p className='text-muted-foreground px-2 text-base sm:px-0 sm:text-xl md:text-2xl lg:text-3xl'>
                {t('subtitle')}
              </p>

              {/* CTA Button */}
              <Link href='/tools'>
                <Button
                  size='lg'
                  className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-semibold shadow-xl transition-colors duration-300 sm:px-10 sm:py-7 sm:text-lg'
                >
                  {t('button')}
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
