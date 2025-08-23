import { redirect } from 'next/navigation';

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (locale === 'ar' || locale === 'en') {
    redirect(`/${locale}/home`);
  } else {
    redirect('/en/home');
  }
}
