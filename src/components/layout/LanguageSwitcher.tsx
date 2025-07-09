'use client';

import { IconLanguage } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import * as React from 'react';

import { Button } from '@/components/ui/button';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = locale === 'en' ? 'ar' : 'en';

  const handleSwitch = React.useCallback(() => {
    const segments = pathname.split('/');
    segments[1] = switchLocale; // replace locale in URL
    const newPath = segments.join('/');
    router.push(newPath);
  }, [pathname, router, switchLocale]);

  return (
    <Button
      variant='secondary'
      size='icon'
      className='group/toggle size-8'
      onClick={handleSwitch}
    >
      <IconLanguage />
      <span className='sr-only'>
        Switch language to {switchLocale.toUpperCase()}
      </span>
    </Button>
  );
}
