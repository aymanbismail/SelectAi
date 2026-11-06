import type { Metadata } from 'next';

import { buildPageMetadata, toAppLocale } from '@/lib/seo';

/**
 * The page itself is a client component and therefore cannot export
 * metadata, so the canonical URL and hreflang alternates for `/explore` live
 * in this layout, which wraps that route only.
 */
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: toAppLocale(locale),
    path: '/explore'
  });
}

export default function ExploreLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
