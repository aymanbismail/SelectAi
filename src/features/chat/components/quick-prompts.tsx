'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconBulb } from '@tabler/icons-react';

const quickPrompts = [
  "What's the best AI tool for writing blog posts?",
  'I need help with image generation and design',
  'Find me tools for automating customer support',
  'What are the top AI coding assistants?',
  'Help me find video editing AI tools',
  'Show me AI tools for data analysis'
];

interface QuickPromptsProps {
  onPromptClick: (prompt: string) => void;
  className?: string;
}

export function QuickPrompts({ onPromptClick, className }: QuickPromptsProps) {
  return (
    <Card className={className}>
      <CardHeader className='pb-3'>
        <CardTitle className='flex items-center gap-2 text-base'>
          <IconBulb className='text-primary h-4 w-4' />
          Quick Prompts
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        {quickPrompts.map((prompt, index) => (
          <Button
            key={index}
            variant='ghost'
            size='sm'
            onClick={() => onPromptClick(prompt)}
            className='hover:bg-muted/80 h-auto w-full justify-start px-3 py-2 text-left text-xs leading-relaxed'
          >
            {prompt}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
