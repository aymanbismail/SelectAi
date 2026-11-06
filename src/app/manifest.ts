import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { routing } from '@/i18n/routing';
import { absoluteUrl, localePath } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: absoluteUrl('/'),
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    // Root resolves to the default locale via the i18n middleware.
    start_url: localePath(routing.defaultLocale, '/home'),
    scope: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#ffffff'
  };
}
