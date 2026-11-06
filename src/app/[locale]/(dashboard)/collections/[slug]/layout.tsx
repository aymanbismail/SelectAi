import type { Metadata } from 'next';

import { buildPageMetadata, toAppLocale } from '@/lib/seo';

/**
 * The page itself is a client component and therefore cannot export
 * metadata, so the per-collection canonical URL and hreflang alternates live
 * here, overriding the parent `/collections` layout.
 */
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  return buildPageMetadata({
    locale: toAppLocale(locale),
    path: `/collections/${slug}`
  });
}

export default function CollectionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
