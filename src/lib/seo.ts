import type { Metadata } from 'next';

import { siteConfig, siteUrl } from '@/config/site';
import { routing } from '@/i18n/routing';

export type AppLocale = (typeof routing.locales)[number];

/** Open Graph locale codes for each supported app locale. */
const OG_LOCALES: Record<AppLocale, string> = {
  en: 'en_US',
  ar: 'ar_AR'
};

export function isAppLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value);
}

/** Coerce an unknown locale segment to a supported one. */
export function toAppLocale(value: string | undefined): AppLocale {
  return value && isAppLocale(value) ? value : routing.defaultLocale;
}

/**
 * Normalize a route path to a leading slash with no trailing slash.
 * The site root normalizes to an empty string so it can be concatenated.
 */
export function normalizePath(path = ''): string {
  const trimmed = path.trim();
  if (!trimmed || trimmed === '/') return '';
  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/, '');
}

/** Absolute URL on the configured site origin. */
export function absoluteUrl(path = ''): string {
  return `${siteUrl}${normalizePath(path)}`;
}

/** Locale-prefixed path, e.g. `('en', '/tools')` -> `/en/tools`. */
export function localePath(locale: AppLocale, path = ''): string {
  return `/${locale}${normalizePath(path)}`;
}

/** Absolute locale-prefixed URL, e.g. `https://example.com/en/tools`. */
export function localeUrl(locale: AppLocale, path = ''): string {
  return absoluteUrl(localePath(locale, path));
}

/** Absolute URL of the per-locale Open Graph image. */
export function ogImageUrl(locale: AppLocale): string {
  return localeUrl(locale, '/opengraph-image');
}

/**
 * Canonical + hreflang alternates for a locale-agnostic path.
 *
 * The current locale points at itself as canonical, every supported locale is
 * listed, and `x-default` points at the default locale.
 */
export function buildAlternates(
  locale: AppLocale,
  path = ''
): NonNullable<Metadata['alternates']> {
  const languages: Record<string, string> = {};

  for (const supported of routing.locales) {
    languages[supported] = localeUrl(supported, path);
  }
  languages['x-default'] = localeUrl(routing.defaultLocale, path);

  return {
    canonical: localeUrl(locale, path),
    languages
  };
}

type PageMetadataInput = {
  locale: AppLocale;
  /** Locale-agnostic path, e.g. `/tools/categories`. */
  path?: string;
  title?: string;
  description?: string;
};

/**
 * Build the URL-bearing parts of a page's metadata (canonical, hreflang,
 * Open Graph and Twitter URLs/images) from the single site-URL source.
 */
export function buildPageMetadata({
  locale,
  path = '',
  title,
  description
}: PageMetadataInput): Metadata {
  const url = localeUrl(locale, path);
  const resolvedDescription = description ?? siteConfig.description;
  const resolvedTitle = title ?? siteConfig.title;
  const image = ogImageUrl(locale);
  const alternateLocales = routing.locales
    .filter((supported) => supported !== locale)
    .map((supported) => OG_LOCALES[supported]);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: buildAlternates(locale, path),
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      locale: OG_LOCALES[locale],
      alternateLocale: alternateLocales,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: resolvedTitle
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: resolvedTitle,
      description: resolvedDescription,
      images: [image]
    }
  };
}

/**
 * Locale-layout defaults: `metadataBase`, Open Graph / Twitter site-level
 * fields and the per-locale social image.
 *
 * Intentionally omits `alternates` and `openGraph.url` — those are per-page
 * and would otherwise be inherited by every nested route.
 */
export function buildLocaleLayoutMetadata(locale: AppLocale): Metadata {
  const image = ogImageUrl(locale);
  const alternateLocales = routing.locales
    .filter((supported) => supported !== locale)
    .map((supported) => OG_LOCALES[supported]);

  return {
    metadataBase: new URL(absoluteUrl()),
    title: siteConfig.title,
    description: siteConfig.description,
    manifest: absoluteUrl('/manifest.webmanifest'),
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      title: siteConfig.title,
      description: siteConfig.description,
      url: localeUrl(locale),
      locale: OG_LOCALES[locale],
      alternateLocale: alternateLocales,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: siteConfig.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: siteConfig.title,
      description: siteConfig.description,
      images: [image]
    }
  };
}
