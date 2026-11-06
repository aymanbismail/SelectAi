import type { Metadata } from 'next';

import { buildPageMetadata, toAppLocale } from '@/lib/seo';

/**
 * The page itself is a client component and therefore cannot export
 * metadata, so the canonical URL and hreflang alternates for `/collections`
 * live here. Nested routes override these in their own layout.
 */
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: toAppLocale(locale),
    path: '/collections'
  });
}

export default function CollectionsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
