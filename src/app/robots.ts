import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Non-indexable application surfaces.
        disallow: [
          '/api/',
          '/en/admin',
          '/ar/admin',
          '/en/auth',
          '/ar/auth',
          '/en/profile',
          '/ar/profile'
        ]
      }
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl()
  };
}
