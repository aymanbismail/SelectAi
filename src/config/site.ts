/**
 * Single source of truth for the public origin of the site.
 *
 * Everything that needs an absolute URL (metadataBase, canonical URLs,
 * hreflang alternates, Open Graph / Twitter tags, sitemap, robots.txt,
 * JSON-LD, the web manifest) must read from here instead of hardcoding a
 * host.
 *
 * Override per environment with `NEXT_PUBLIC_SITE_URL` (no trailing slash),
 * e.g. a Vercel preview deployment or a local tunnel. The fallback is the
 * production origin.
 */

const DEFAULT_SITE_URL = 'https://selectai.aymanismail.com';

function normalizeOrigin(value: string | undefined): string {
  const raw = value?.trim();
  if (!raw) return DEFAULT_SITE_URL;

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  // Drop any trailing slash so callers can safely concatenate paths.
  return withProtocol.replace(/\/+$/, '');
}

/** Absolute origin of the site, without a trailing slash. */
export const siteUrl = normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);

export const siteConfig = {
  name: 'SelectAI',
  /** Used for `og:site_name` and JSON-LD. */
  shortName: 'SelectAI',
  title: 'Select AI',
  description: 'Find the best AI tools for your task',
  url: siteUrl,
  twitterHandle: '@rebestx',
  githubUrl: 'https://github.com/ReBestX/SelectAi'
} as const;

export type SiteConfig = typeof siteConfig;
