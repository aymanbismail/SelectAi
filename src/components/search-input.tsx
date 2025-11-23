'use client';
import { useKBar } from 'kbar';
import { IconSearch } from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

export default function SearchInput() {
  const { query } = useKBar();
  const locale = useLocale();
  const t = useTranslations('common');
  const isRTL = locale === 'ar';
  return (
    <>
      {/* Icon-only button for screens below 950px */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='flex h-9 w-9 items-center justify-center p-0 min-[950px]:hidden'
            onClick={query.toggle}
            aria-label={t('search')}
          >
            <IconSearch className='h-4 w-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent side='bottom' align='center' sideOffset={4}>
          <p>{t('search')}</p>
        </TooltipContent>
      </Tooltip>

      {/* Full search bar for screens 950px and above */}
      <div className='hidden w-full space-y-2 min-[950px]:block'>
        <Button
          variant='outline'
          className='bg-background text-muted-foreground relative h-9 w-full justify-start rounded-[0.5rem] text-sm font-normal shadow-none sm:pr-12 md:w-40 lg:w-64'
          onClick={query.toggle}
        >
          <IconSearch className='mr-2 h-4 w-4' />
          Search...
          <kbd
            className={cn(
              'border-foreground/20 text-foreground/70 pointer-events-none absolute top-[0.3rem] hidden h-6 items-center gap-1 rounded border bg-transparent px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex dark:border-white/30 dark:text-white/80',
              isRTL ? 'left-[0.3rem]' : 'right-[0.3rem]'
            )}
          >
            <span className='text-xs'>⌘</span>K
          </kbd>
        </Button>
      </div>
    </>
  );
}
