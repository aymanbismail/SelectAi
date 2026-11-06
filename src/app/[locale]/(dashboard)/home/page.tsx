import type { Metadata } from 'next';

import { buildPageMetadata, toAppLocale } from '@/lib/seo';
import PageContainer from '@/components/layout/page-container';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { HeroCTASection } from '@/components/hero-cta-section';
import { Footer } from '@/components/layout/footer';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: toAppLocale(locale),
    path: '/home',
    title: 'Select AI - Home'
  });
}

export default async function HomePage() {
  return (
    <PageContainer scrollable={true} className='!p-0'>
      <div className='flex w-full flex-col pt-16'>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Hero CTA Section */}
        <HeroCTASection />

        {/* Footer - only on home page */}
        <Footer />
      </div>
    </PageContainer>
  );
}
