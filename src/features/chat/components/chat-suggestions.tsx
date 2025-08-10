'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

interface SuggestionCard {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: keyof typeof Icons;
  color: string;
}

const suggestions: SuggestionCard[] = [
  {
    id: '1',
    title: 'Find Writing Tools',
    description:
      'Get AI-powered tools for content creation, copywriting, and editing',
    category: 'Content',
    icon: 'post',
    color: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20'
  },
  {
    id: '2',
    title: 'Discover Design AI',
    description:
      'Explore tools for graphic design, image generation, and creative work',
    category: 'Design',
    icon: 'media',
    color: 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20'
  },
  {
    id: '3',
    title: 'Business Automation',
    description: 'Find AI agents and tools to automate your business processes',
    category: 'Business',
    icon: 'settings',
    color: 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
  },
  {
    id: '4',
    title: 'Code Assistant',
    description:
      'Get help with programming, debugging, and software development',
    category: 'Development',
    icon: 'dashboard',
    color: 'bg-orange-500/10 text-orange-600 hover:bg-orange-500/20'
  }
];

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  return (
    <div className='space-y-4'>
      <div className='space-y-2 text-center'>
        <h3 className='text-lg font-semibold'>What can I help you with?</h3>
        <p className='text-muted-foreground text-sm'>
          Choose a category below or ask me anything about AI tools
        </p>
      </div>

      <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
        {suggestions.map((suggestion) => {
          const IconComponent = Icons[suggestion.icon];

          return (
            <Card
              key={suggestion.id}
              className='cursor-pointer border shadow-xs transition-all duration-200 hover:scale-[1.02] hover:shadow-md'
              onClick={() => onSuggestionClick(suggestion.title)}
            >
              <CardContent className='p-4'>
                <div className='flex items-start gap-3'>
                  <div
                    className={cn(
                      'rounded-lg p-2 transition-all duration-200',
                      suggestion.color
                    )}
                  >
                    <IconComponent className='h-5 w-5' />
                  </div>
                  <div className='flex-1 space-y-2'>
                    <div className='flex items-center gap-2'>
                      <h4 className='text-sm font-medium'>
                        {suggestion.title}
                      </h4>
                      <Badge variant='secondary' className='text-xs'>
                        {suggestion.category}
                      </Badge>
                    </div>
                    <p className='text-muted-foreground text-xs leading-relaxed'>
                      {suggestion.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
