# AI Chat Feature

## Overview

The AI Chat feature provides an interactive chat interface where users can get help finding the best AI tools for their specific needs. The chat is designed to be consistent with the overall site design and provides suggestions for common use cases.

## Components

### 1. ChatInterface (`chat-interface.tsx`)

The main chat component that handles the conversation flow.

**Features:**

- Real-time messaging interface
- Welcome screen with suggestions when no messages
- Typing indicators
- Auto-scroll to latest messages
- Responsive design
- Dark/light mode support

**Props:** None (self-contained)

### 2. ChatSuggestions (`chat-suggestions.tsx`)

Displays quick-action cards for common AI tool categories.

**Features:**

- 4 predefined suggestion cards
- Category-based organization (Content, Design, Business, Development)
- Color-coded icons
- Hover animations consistent with site design

**Props:**

- `onSuggestionClick: (suggestion: string) => void` - Callback when a suggestion is clicked

### 3. ChatToolbar (`chat-toolbar.tsx`)

Provides quick access to chat-related actions (shown only when conversation started).

**Features:**

- History access
- Saved conversations
- Export functionality
- Share options
- Settings access

**Props:**

- `onExportChat?: () => void`
- `onShareChat?: () => void`
- `onShowHistory?: () => void`
- `onShowBookmarks?: () => void`
- `onShowSettings?: () => void`

## Design Consistency

The chat feature maintains consistency with the site's design system:

### Visual Elements

- Uses the same card styling with `shadow-xs`
- Follows the gradient pattern `from-primary/5 to-card`
- Consistent button variants and sizes
- Proper spacing with Tailwind classes
- Responsive grid layouts

### Color Scheme

- Primary colors for user messages
- Muted backgrounds for AI responses
- Category-specific accent colors for suggestions
- Consistent with overall site theming

### Typography

- Matches heading styles and font weights
- Consistent text sizes (`text-sm`, `text-xs`)
- Proper line heights (`leading-relaxed`)

## Internationalization

The chat page supports internationalization through:

- Translation keys in `messages/en.json` and `messages/ar.json`
- Uses `useTranslations('chat')` hook
- Supports RTL layouts

### Translation Keys

```json
{
  "chat": {
    "title": "Discover the best AI tool for your task",
    "description": "Chat with your AI assistant and ask for help with your daily tasks."
  }
}
```

## Usage

### In a Page

```tsx
import { ChatInterface } from '@/features/chat/components';

export default function ChatPage() {
  return (
    <div className='container'>
      <ChatInterface />
    </div>
  );
}
```

### Standalone Component

```tsx
import { ChatSuggestions } from '@/features/chat/components';

function MyComponent() {
  const handleSuggestion = (suggestion: string) => {
    console.log('User clicked:', suggestion);
  };

  return <ChatSuggestions onSuggestionClick={handleSuggestion} />;
}
```

## Technical Implementation

### State Management

- Uses React hooks (`useState`, `useRef`, `useEffect`)
- Local state for messages, input, and loading states
- No external state management library needed

### Styling

- Tailwind CSS classes
- Uses site's design tokens and component patterns
- Responsive design with mobile-first approach

### Performance

- Efficient re-renders with proper key props
- Auto-scroll optimization
- Proper cleanup of effects

## Future Enhancements

1. **Real AI Integration**: Replace mock responses with actual AI API
2. **Conversation Persistence**: Save/load chat history
3. **Message Reactions**: Like/dislike responses
4. **File Upload**: Support for image/document uploads
5. **Voice Input**: Speech-to-text functionality
6. **Search Integration**: Link suggestions to actual tool searches
7. **Conversation Export**: Download chat as PDF/text
8. **Multi-language Support**: Enhanced i18n features

## File Structure

```
src/features/chat/
├── components/
│   ├── index.ts
│   ├── chat-interface.tsx
│   ├── chat-suggestions.tsx
│   └── chat-toolbar.tsx
└── README.md
```
