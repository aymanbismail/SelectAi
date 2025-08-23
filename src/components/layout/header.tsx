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
    <header className='border-sidebar-border bg-background/60 supports-[backdrop-filter]:bg-background/50 flex h-16 shrink-0 items-center justify-between gap-2 backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-2 px-4'>
        <CtaGithub />
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <UserNav />
        <ModeToggle />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
