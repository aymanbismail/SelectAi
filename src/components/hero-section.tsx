'use client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className={cn('relative w-full px-4 py-16 lg:py-20')}>
      <div
        className={cn(
          'flex flex-col',
          isRTL ? 'items-end text-right' : 'items-start text-left'
        )}
      >
        <Badge
          variant='secondary'
          className={cn(
            'mb-6 flex items-center px-4 py-2 text-sm',
            isRTL && 'flex-row-reverse'
          )}
        >
          <Sparkles
            className={cn('h-4 w-4', isRTL ? 'ml-2 rotate-180' : 'mr-2')}
          />
          {t('badge')}
        </Badge>

        <h1
          className={cn(
            'text-foreground mb-6 text-4xl leading-tight font-bold tracking-tight whitespace-pre-wrap sm:text-5xl lg:text-6xl',
            isRTL ? 'text-right' : 'text-left'
          )}
        >
          {t('title')}{' '}
          <span className='from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent'>
            {t('titleHighlight')}
          </span>{' '}
          {t('titleSuffix')}
        </h1>

        <p
          className={cn(
            'text-muted-foreground mb-10 max-w-2xl text-lg leading-relaxed sm:text-xl',
            isRTL ? 'ml-auto text-right' : 'text-left'
          )}
        >
          {t('description')}
        </p>

        <div
          className={cn(
            'flex w-full flex-col gap-4 sm:flex-row',
            isRTL
              ? 'items-end justify-end sm:flex-row-reverse'
              : 'items-start justify-start'
          )}
        >
          <Button asChild size='lg' className='px-8 text-base'>
            <Link href={`/${locale}/ai-tools`}>
              {t('exploreButton')}
              <ArrowRight
                className={cn(
                  'h-4 w-4 transition-transform',
                  isRTL ? 'mr-2 rotate-180' : 'ml-2'
                )}
              />
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
    </section>
  );
}
