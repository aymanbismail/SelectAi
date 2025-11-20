'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import BlurText from './BlurText';
export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  const handleTitleAnimationComplete = () => {
    setTitleAnimationComplete(true);
  };

  return (
    <section className={cn('relative w-full overflow-x-hidden py-16 lg:py-20')}>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='flex flex-col items-center text-center'>
          <Badge
            variant='secondary'
            className='mb-6 flex items-center px-4 py-2 text-sm'
          >
            <Sparkles className='mr-2 h-4 w-4' />
            {t('badge')}
          </Badge>

          <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
            <BlurText
              text={`${t('title')} ${t('titleHighlight')} ${t('titleSuffix')}`}
              delay={150}
              animateBy='words'
              displayAs='block'
              direction='top'
              onAnimationComplete={handleTitleAnimationComplete}
              className='text-foreground mb-6 text-center text-4xl leading-tight font-bold tracking-tight whitespace-pre-wrap sm:text-5xl lg:text-6xl'
            />
          </div>

          <div
            className={cn(
              'mx-auto mb-10 w-full max-w-2xl px-4',
              'text-center text-lg leading-relaxed sm:text-xl',
              'text-muted-foreground'
            )}
            style={{ direction: isRTL ? 'rtl' : 'ltr' }}
          >
            {titleAnimationComplete && (
              <BlurText
                text={t('description')}
                delay={100}
                animateBy='words'
                direction='top'
                displayAs='block'
                className={cn(
                  'text-lg leading-relaxed sm:text-xl',
                  'text-muted-foreground'
                )}
              />
            )}
          </div>

          <div
            className={cn(
              'flex flex-col gap-4 sm:flex-row',
              isRTL && 'sm:flex-row-reverse'
            )}
          >
            <Button asChild size='lg' className='px-8 text-base'>
              <Link href={`/${locale}/ai-tools`} className='flex items-center'>
                <span>{t('exploreButton')}</span>
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='px-8 text-base'
            >
              <Link href={`/${locale}/ai-tools/new`}>{t('requestButton')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
