import { redirect } from 'next/navigation';

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = params;

  if (locale === 'ar' || locale === 'en') {
    redirect(`/${locale}/dashboard/overview`);
  } else {
    redirect('/en/dashboard/overview');
  }
}
