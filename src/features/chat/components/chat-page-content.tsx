'use client';

import { ChatInterface } from './chat-interface';
import { QuickPrompts } from './quick-prompts';

export function ChatPageContent() {
  const handlePromptClick = (prompt: string) => {
    // TODO: Implement prompt injection into ChatInterface
    // For now, this just prevents the error
    void prompt;
  };

  return (
    <div className='flex flex-1 gap-4'>
      {/* Main Chat Interface */}
      <div className='bg-card flex-1 rounded-lg border shadow-xs'>
        <ChatInterface />
      </div>

      {/* Sidebar with Quick Prompts */}
      <div className='hidden w-80 space-y-4 lg:block'>
        <QuickPrompts onPromptClick={handlePromptClick} className='shadow-xs' />
      </div>
    </div>
  );
}
