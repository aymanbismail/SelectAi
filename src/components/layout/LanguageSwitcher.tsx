'use client';

import { IconLanguage } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('common');

  const switchLocale = locale === 'en' ? 'ar' : 'en';
  const targetLanguageName = switchLocale === 'ar' ? t('arabic') : t('english');

  const handleSwitch = React.useCallback(() => {
    const segments = pathname.split('/');
    segments[1] = switchLocale; // replace locale in URL
    const newPath = segments.join('/');
    router.push(newPath);
  }, [pathname, router, switchLocale]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='group/toggle border-foreground/20 text-foreground hover:bg-foreground/10 hover:text-foreground size-8 border bg-transparent dark:border-white/15 dark:text-white dark:hover:bg-white/10'
          onClick={handleSwitch}
        >
          <IconLanguage />
          <span className='sr-only'>
            Switch language to {switchLocale.toUpperCase()}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side='bottom' align='center' sideOffset={4}>
        <p>{targetLanguageName}</p>
      </TooltipContent>
    </Tooltip>
  );
}
