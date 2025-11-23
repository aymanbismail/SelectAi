import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { ChatPageContent } from '@/features/chat/components';
import { useTranslations } from 'next-intl';

export const metadata = {
  title: 'Select AI - Chat',
  description: 'Chat with AI to find the perfect tools for your needs'
};

export default function ChatPage() {
  const t = useTranslations('chat');

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4 pt-16'>
        <div className='flex items-center justify-between space-y-2'>
          <Heading title={t('title')} description={t('description')} />
        </div>
        <ChatPageContent />
      </div>
    </PageContainer>
  );
}
