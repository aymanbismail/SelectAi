'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  IconBookmarks,
  IconHistory,
  IconSettings,
  IconDownload,
  IconShare
} from '@tabler/icons-react';

interface ChatToolbarProps {
  onExportChat?: () => void;
  onShareChat?: () => void;
  onShowHistory?: () => void;
  onShowBookmarks?: () => void;
  onShowSettings?: () => void;
}

export function ChatToolbar({
  onExportChat,
  onShareChat,
  onShowHistory,
  onShowBookmarks,
  onShowSettings
}: ChatToolbarProps) {
  return (
    <div className='border-b p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='sm'
            onClick={onShowHistory}
            className='gap-2'
          >
            <IconHistory className='h-4 w-4' />
            History
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={onShowBookmarks}
            className='gap-2'
          >
            <IconBookmarks className='h-4 w-4' />
            Saved
          </Button>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='sm'
            onClick={onExportChat}
            className='gap-2'
          >
            <IconDownload className='h-4 w-4' />
            Export
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={onShareChat}
            className='gap-2'
          >
            <IconShare className='h-4 w-4' />
            Share
          </Button>
          <Separator orientation='vertical' className='h-4' />
          <Button
            variant='ghost'
            size='sm'
            onClick={onShowSettings}
            className='gap-2'
          >
            <IconSettings className='h-4 w-4' />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
