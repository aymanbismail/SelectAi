import type { Metadata } from 'next';

import { buildPageMetadata, toAppLocale } from '@/lib/seo';
import ToolsClient from '@/components/ai/ToolsClient';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: toAppLocale(locale),
    path: '/tools',
    title: 'Select AI - Tools'
  });
}

export default function AIToolsPage() {
  return <ToolsClient />;
}
