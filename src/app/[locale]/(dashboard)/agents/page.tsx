import type { Metadata } from 'next';

import { buildPageMetadata, toAppLocale } from '@/lib/seo';
import AgentsClient from '@/components/ai/AgentsClient';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: toAppLocale(locale),
    path: '/agents',
    title: 'Select AI - Agents'
  });
}

export default function AIAgentsPage() {
  return <AgentsClient />;
}
