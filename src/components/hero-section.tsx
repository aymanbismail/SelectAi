'use client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import BlurText from './BlurText';
import { AnimatedContainer } from '@/components/animation/animated-container';
export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section
      className={cn(
        'relative mt-12 w-full overflow-x-hidden py-12 sm:mt-10 sm:py-16 lg:py-20'
      )}
    >
      <div className='mx-auto max-w-7xl px-3 sm:px-4'>
        <div className='flex flex-col items-center text-center'>
          <AnimatedContainer delay={0.1}>
            <Badge
              variant='secondary'
              className='mb-4 flex items-center px-3 py-1.5 text-xs sm:mb-6 sm:px-4 sm:py-2 sm:text-sm'
            >
              <Sparkles className='mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4' />
              {t('badge')}
            </Badge>
          </AnimatedContainer>

          <AnimatedContainer delay={0.2}>
            <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
              <BlurText
                text={`${t('title')} ${t('titleHighlight')} ${t('titleSuffix')}`}
                delay={150}
                animateBy='words'
                displayAs='block'
                direction='top'
                className='text-foreground mb-4 text-center text-3xl leading-tight font-bold tracking-tight whitespace-pre-wrap sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl'
              />
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={0.3}>
            <p
              className={cn(
                'mx-auto mb-6 w-full max-w-2xl px-2',
                'text-center text-base leading-relaxed sm:mb-10 sm:px-4 sm:text-lg md:text-xl',
                'text-muted-foreground'
              )}
              style={{ direction: isRTL ? 'rtl' : 'ltr' }}
            >
              {t('description')}
            </p>
          </AnimatedContainer>

          <AnimatedContainer delay={0.4}>
            <div
              className={cn(
                'flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4',
                isRTL && 'sm:flex-row-reverse'
              )}
            >
              <Button
                asChild
                size='lg'
                className='w-full max-w-xs px-6 text-sm sm:w-auto sm:px-8 sm:text-base'
              >
                <Link
                  href={`/${locale}/ai-tools`}
                  className='flex items-center justify-center'
                >
                  <span>{t('exploreButton')}</span>
                  <ArrowRight className='ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4' />
                </Link>
              </Button>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='w-full max-w-xs px-6 text-sm sm:w-auto sm:px-8 sm:text-base'
              >
                <Link href={`/${locale}/ai-tools/new`}>
                  {t('requestButton')}
                </Link>
              </Button>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
