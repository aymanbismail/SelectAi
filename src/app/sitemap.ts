import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import {
  agentCategoryConfigs,
  toolCategoryConfigs
} from '@/constants/categories';
import { type AppLocale, localeUrl } from '@/lib/seo';

/** Public, indexable routes (locale-agnostic paths). */
const STATIC_PATHS = [
  '',
  '/home',
  '/explore',
  '/tools',
  '/tools/categories',
  '/agents',
  '/agents/categories',
  '/collections'
] as const;

function categoryPaths(): string[] {
  return [
    ...toolCategoryConfigs.flatMap(({ slug }) => [
      `/tools/${slug}`,
      `/tools/categories/${slug}`
    ]),
    ...agentCategoryConfigs.flatMap(({ slug }) => [
      `/agents/${slug}`,
      `/agents/categories/${slug}`
    ])
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [...STATIC_PATHS, ...categoryPaths()];

  return paths.flatMap((path) =>
    routing.locales.map((locale: AppLocale) => ({
      url: localeUrl(locale, path),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: path === '' || path === '/home' ? 1 : 0.7,
      // hreflang alternates for every entry
      alternates: {
        languages: Object.fromEntries([
          ...routing.locales.map((supported) => [
            supported,
            localeUrl(supported, path)
          ]),
          ['x-default', localeUrl(routing.defaultLocale, path)]
        ])
      }
    }))
  );
}
