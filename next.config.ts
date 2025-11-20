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
      }
    ]
  },
  transpilePackages: ['geist']
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(baseConfig);
