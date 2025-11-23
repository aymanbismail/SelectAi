'use client';

import { IconBrightness } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const t = useTranslations('common');

  const handleThemeToggle = React.useCallback(
    (e?: React.MouseEvent) => {
      const newMode = resolvedTheme === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;

      if (!document.startViewTransition) {
        setTheme(newMode);
        return;
      }

      // Set coordinates from the click event
      if (e) {
        root.style.setProperty('--x', `${e.clientX}px`);
        root.style.setProperty('--y', `${e.clientY}px`);
      }

      document.startViewTransition(() => {
        setTheme(newMode);
      });
    },
    [resolvedTheme, setTheme]
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='group/toggle border-foreground/20 text-foreground hover:bg-foreground/10 hover:text-foreground size-8 border bg-transparent dark:border-white/15 dark:text-white dark:hover:bg-white/10'
          onClick={handleThemeToggle}
        >
          <IconBrightness />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side='bottom' align='center' sideOffset={4}>
        <p>{t('toggleTheme')}</p>
      </TooltipContent>
    </Tooltip>
  );
}
