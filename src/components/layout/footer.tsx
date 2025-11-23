'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <footer className='border-sidebar-border bg-background/60 supports-[backdrop-filter]:bg-background/50 border-t py-6 backdrop-blur sm:py-8'>
      <div className='mx-auto max-w-7xl px-3 sm:px-4'>
        <div
          className={cn(
            'flex flex-col items-center justify-between gap-4 text-center sm:flex-row',
            isRTL && 'sm:flex-row-reverse'
          )}
        >
          {/* Logo and Creator Credit */}
          <div
            className={cn(
              'flex flex-col items-center gap-2 sm:items-start',
              isRTL && 'sm:items-end'
            )}
          >
            <div className='flex items-center gap-2'>
              <span className='text-foreground text-base font-bold sm:text-lg'>
                Select AI
              </span>
            </div>
            <p
              className={cn(
                'text-muted-foreground/80 text-xs leading-relaxed sm:text-sm',
                isRTL && 'sm:text-right'
              )}
              style={{
                direction: isRTL ? 'rtl' : 'ltr',
                unicodeBidi: 'plaintext'
              }}
            >
              {t('createdBy.text')} <span className='text-purple-500'>💜</span>{' '}
              {t('createdBy.by')}{' '}
              <Link
                href='https://github.com/ReBestX'
                target='_blank'
                rel='noopener noreferrer'
                className='text-foreground font-semibold transition-colors hover:text-purple-500'
                style={{ direction: 'ltr', unicodeBidi: 'embed' }}
              >
                ReBestX
              </Link>
            </p>
          </div>

          {/* Copyright and Links */}
          <div
            className={cn(
              'flex flex-col items-center gap-2 sm:items-end',
              isRTL && 'sm:items-start'
            )}
          >
            <p className='text-muted-foreground/80 text-xs sm:text-sm'>
              {t('copyright')} 2025 Select AI
            </p>
            <div className='flex items-center gap-3 sm:gap-4'>
              <Link
                href='https://github.com/ReBestX/SelectAi'
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground/80 hover:text-foreground text-xs transition-colors sm:text-sm'
              >
                GitHub
              </Link>
              <span className='text-muted-foreground/50'>•</span>
              <Link
                href='/about'
                className='text-muted-foreground/80 hover:text-foreground text-xs transition-colors sm:text-sm'
              >
                {t('about')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
