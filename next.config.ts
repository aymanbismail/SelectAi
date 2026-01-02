import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const baseConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // cspell:disable-next-line
        hostname: 'api.slingacademy.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: ''
      }
    ]
  },
  transpilePackages: ['geist'],

  // Redirects from old /ai-tools routes to new /tools routes (SEO & backward compatibility)
  async redirects() {
    return [
      // Base route redirects
      {
        source: '/ai-tools',
        destination: '/tools',
        permanent: true
      },
      {
        source: '/ai-tools/:path*',
        destination: '/tools/:path*',
        permanent: true
      },
      // Locale-specific redirects (en)
      {
        source: '/en/ai-tools',
        destination: '/en/tools',
        permanent: true
      },
      {
        source: '/en/ai-tools/:path*',
        destination: '/en/tools/:path*',
        permanent: true
      },
      // Locale-specific redirects (ar)
      {
        source: '/ar/ai-tools',
        destination: '/ar/tools',
        permanent: true
      },
      {
        source: '/ar/ai-tools/:path*',
        destination: '/ar/tools/:path*',
        permanent: true
      }
    ];
  }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(baseConfig);
