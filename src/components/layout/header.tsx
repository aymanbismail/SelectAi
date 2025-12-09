import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { UserNav } from './user-nav';
import { ModeToggle } from './ThemeToggle/theme-toggle';
import CtaGithub from './cta-github';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  return (
    <header className='header-glass border-border bg-background/85 fixed top-0 right-0 left-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 border-b backdrop-blur-xl transition-[margin,width,height] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='text-muted-foreground hover:text-foreground -ml-1' />
        <Separator orientation='vertical' className='bg-border mr-2 h-4' />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-2 px-4'>
        <CtaGithub />
        <SearchInput />
        <UserNav />
        <ModeToggle />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
