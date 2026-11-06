import { siteConfig } from '@/config/site';
import { type AppLocale, absoluteUrl, localeUrl } from '@/lib/seo';
import { routing } from '@/i18n/routing';

type JsonLdProps = {
  locale: AppLocale;
};

/**
 * Structured data for the site. Every URL is derived from the single
 * site-URL source in `@/config/site`.
 */
export function JsonLd({ locale }: JsonLdProps) {
  const organizationId = `${absoluteUrl()}/#organization`;
  const websiteId = `${localeUrl(locale)}/#website`;

  const graph = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: siteConfig.name,
      url: absoluteUrl(),
      sameAs: [siteConfig.githubUrl]
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: siteConfig.name,
      alternateName: siteConfig.title,
      description: siteConfig.description,
      url: localeUrl(locale),
      inLanguage: locale,
      publisher: { '@id': organizationId },
      workTranslationOf: routing.locales
        .filter((supported) => supported !== locale)
        .map((supported) => ({
          '@type': 'WebSite',
          url: localeUrl(supported),
          inLanguage: supported
        }))
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph
  };

  return (
    <script
      type='application/ld+json'
      // Serialized server-side from static config; no user input involved.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
      }}
    />
  );
}
