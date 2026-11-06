import type { Metadata } from 'next';
import '@/app/[locale]/globals.css';

import { siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  // Single source of truth for every relative URL Next.js resolves.
  metadataBase: new URL(absoluteUrl()),
  title: siteConfig.title,
  description: siteConfig.description
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
