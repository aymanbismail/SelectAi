import PageContainer from '@/components/layout/page-container';
import { useTranslations } from 'next-intl';

export default function OverViewLayout() {
  const t = useTranslations('chat');
  return (
    <PageContainer>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-2xl font-medium tracking-tight'>{t('title')}</h2>
      </div>
    </PageContainer>
  );
}
