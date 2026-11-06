import { ImageResponse } from 'next/og';

import { siteConfig } from '@/config/site';
import { toAppLocale } from '@/lib/seo';

export const alt = `${siteConfig.name} - ${siteConfig.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Per-locale social card. Next.js resolves the public URL of this route
 * against `metadataBase`, so the rendered `og:image` / `twitter:image` always
 * points at the configured site origin.
 */
export default async function OpenGraphImage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = toAppLocale(rawLocale);
  const host = siteConfig.url.replace(/^https?:\/\//, '');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: '#09090b',
          color: '#ffffff'
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#a1a1aa'
          }}
        >
          {locale}
        </div>
        <div style={{ fontSize: 110, fontWeight: 700, marginTop: 16 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 44, color: '#d4d4d8', marginTop: 8 }}>
          {siteConfig.description}
        </div>
        <div style={{ fontSize: 30, color: '#71717a', marginTop: 40 }}>
          {host}
        </div>
      </div>
    ),
    size
  );
}
