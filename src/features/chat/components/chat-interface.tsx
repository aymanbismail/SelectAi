'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  IconSend,
  IconUser,
  IconRobot,
  IconLoader2
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { ChatSuggestions } from './chat-suggestions';
import { ChatToolbar } from './chat-toolbar';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(),
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (): string => {
    const responses = [
      "Based on your query, I'd recommend exploring our AI Tools section. You can find specialized tools for content creation, design, automation, and more. Would you like me to guide you to a specific category?",

      "That's a great question! For tasks like that, I'd suggest checking out our featured AI tools. We have categories for writing, design, business automation, and development tools. Each category has curated tools that excel in their specific domains.",

      'I can definitely help you find the right AI tool for that! Our platform has both AI Tools for specific tasks and AI Agents for more complex workflows. What type of outcome are you looking to achieve?',

      'Perfect! For that type of work, you might want to browse our categories section. We organize tools by functionality - whether you need content generation, image creation, data analysis, or process automation.',

      "Excellent choice! I'd recommend starting with our most popular categories. You can find tools for creative work, business processes, technical development, and more. Each tool comes with detailed descriptions and user reviews.",

      'That sounds like a perfect use case for our AI tools! Would you like me to suggest some specific categories that would be most relevant? We have tools for productivity, creativity, analysis, and automation that might fit your needs.'
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='flex h-[calc(100vh-12rem)] flex-col'>
      {/* Chat Toolbar - only show when there are messages */}
      {messages.length > 0 && <ChatToolbar />}

      {/* Chat Messages */}
      <ScrollArea ref={scrollAreaRef} className='flex-1 pr-4'>
        <div className='space-y-4 p-4'>
          {messages.length === 0 ? (
            <div className='flex h-full min-h-[400px] flex-col items-center justify-center space-y-6'>
              <div className='space-y-4 text-center'>
                <div className='bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full'>
                  <IconRobot className='text-primary h-8 w-8' />
                </div>
                <div>
                  <h2 className='mb-2 text-xl font-semibold'>
                    Welcome to AI Chat
                  </h2>
                  <p className='text-muted-foreground'>
                    I&apos;m here to help you discover the perfect AI tools for
                    your needs
                  </p>
                </div>
              </div>
              <ChatSuggestions onSuggestionClick={handleSuggestionClick} />
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <Avatar className='mt-1 h-8 w-8 shrink-0'>
                      <AvatarFallback className='bg-primary/10 text-primary'>
                        <IconRobot className='h-4 w-4' />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'bg-muted/50 text-foreground border shadow-xs'
                    )}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <Avatar className='mt-1 h-8 w-8 shrink-0'>
                      <AvatarFallback className='bg-secondary'>
                        <IconUser className='h-4 w-4' />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className='flex justify-start gap-3'>
                  <Avatar className='mt-1 h-8 w-8 shrink-0'>
                    <AvatarFallback className='bg-primary/10 text-primary'>
                      <IconRobot className='h-4 w-4' />
                    </AvatarFallback>
                  </Avatar>
                  <div className='bg-muted/50 flex items-center gap-2 rounded-lg border px-4 py-2.5 shadow-xs'>
                    <IconLoader2 className='h-4 w-4 animate-spin' />
                    <span className='text-muted-foreground text-sm'>
                      Thinking...
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className='border-t p-4'>
        <div className='flex gap-2'>
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Ask me anything about AI tools...'
            disabled={isLoading}
            className='flex-1'
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size='icon'
            className='shrink-0'
          >
            {isLoading ? (
              <IconLoader2 className='h-4 w-4 animate-spin' />
            ) : (
              <IconSend className='h-4 w-4' />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
