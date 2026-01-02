'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { getAiToolsNavItems, getAiAgentsNavItems } from '@/constants/data';
import {
  getToolCategoriesForSidebar,
  getAgentCategoriesForSidebar
} from '@/constants/categories';
import {
  SidebarNavSkeleton,
  SidebarCategoriesSkeleton
} from './sidebar-skeleton';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useWindowHeight } from '@/hooks/use-window-height';
// TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION
// import { useUser } from '@clerk/nextjs';
import { useAuth } from '@/contexts/auth-context';
import {
  IconBell,
  IconChevronRight,
  IconChevronsDown,
  IconCreditCard,
  IconLogout,
  IconPhotoUp,
  IconUserCircle
} from '@tabler/icons-react';
// TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION
// import { SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Icons } from '../icons';
import type { NavItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { OrgSwitcher } from '../org-switcher';
export const company = {
  name: 'Acme Inc',
  logo: IconPhotoUp,
  plan: 'Enterprise'
};

const getTenants = (tNav: (key: string) => string) => [
  { id: '1', name: tNav('aiTools') },
  { id: '2', name: tNav('aiAgents') }
];

// Demo user for testing without authentication
// const demoUser = {
//   fullName: 'Ayman Ismail',
//   emailAddresses: [{ emailAddress: 'ayman@example.com' }],
//   imageUrl: ''
// };

export default function AppSidebar() {
  const pathname = usePathname();
  const { isOpen } = useMediaQuery();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const windowHeight = useWindowHeight();
  // Use the new AuthContext instead of demo user
  const { user, logout, loading: authLoading } = useAuth();
  const t = useTranslations('auth');
  const tSidebar = useTranslations('sidebar');
  const tNav = useTranslations('navigation');
  const tToolCat = useTranslations('toolCategories');
  const tAgentCat = useTranslations('agentCategories');
  const router = useRouter();
  const locale = useLocale();

  // Get translated tenants
  const tenants = React.useMemo(() => getTenants(tNav), [tNav]);

  // Determine if we should use fixed header behavior (when height >= 700px)
  const isLargeViewport = windowHeight >= 700;

  // State for active tenant - always start with first tenant to avoid hydration mismatch
  const [activeTenant, setActiveTenant] = React.useState(() => tenants[0]);

  // Track if we've loaded the initial tenant from localStorage
  const [hasLoadedInitialTenant, setHasLoadedInitialTenant] =
    React.useState(false);

  // Loading states for sidebar navigation - start as false for initial page load
  const [isLoadingNavItems, setIsLoadingNavItems] = React.useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = React.useState(false);

  // Close mobile sidebar on path change
  React.useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, setOpenMobile]);

  // Load saved tenant from localStorage after component mounts
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTenantId = localStorage.getItem('selected-tenant-id');
      if (savedTenantId) {
        const savedTenant = tenants.find((t) => t.id === savedTenantId);
        if (savedTenant) {
          setActiveTenant(savedTenant);
        }
      }
      setHasLoadedInitialTenant(true);
    }
  }, [tenants]); // Re-run when tenants change (e.g., language switch)

  // Sync activeTenant name with translations when language changes
  React.useEffect(() => {
    const updatedTenant = tenants.find((t) => t.id === activeTenant.id);
    if (updatedTenant && updatedTenant.name !== activeTenant.name) {
      setActiveTenant(updatedTenant);
    }
  }, [tenants, activeTenant.id, activeTenant.name]);

  const handleSwitchTenant = (tenantId: string) => {
    // Find the tenant by ID and update the active tenant
    const tenant = tenants.find((t) => t.id === tenantId);
    if (tenant) {
      // Show loading state when switching tenants
      setIsLoadingNavItems(true);
      setIsLoadingCategories(true);

      setActiveTenant(tenant);
      // Save the selected tenant to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('selected-tenant-id', tenantId);
      }
    }
    // Currently disabled for Laravel auth migration
    void tenantId;
  };

  // Determine sidebar side based on locale
  const sidebarSide = locale === 'ar' ? 'right' : 'left';

  // Build translation objects for navigation
  const navTranslations = {
    home: tNav('home'),
    explore: tNav('explore'),
    collections: tNav('collections'),
    categories: tNav('categories'),
    aiTools: tNav('aiTools'),
    aiAgents: tNav('aiAgents')
  };

  // Build translation objects for tool categories
  const toolCategoryTranslations: Record<string, string> = {
    textAi: tToolCat('textAi'),
    imageAi: tToolCat('imageAi'),
    videoAi: tToolCat('videoAi'),
    audioAi: tToolCat('audioAi'),
    codeAi: tToolCat('codeAi'),
    businessAi: tToolCat('businessAi'),
    researchAi: tToolCat('researchAi'),
    designAi: tToolCat('designAi'),
    marketingAi: tToolCat('marketingAi'),
    productivityAi: tToolCat('productivityAi')
  };

  // Build translation objects for agent categories
  const agentCategoryTranslations: Record<string, string> = {
    codingAgent: tAgentCat('codingAgent'),
    researchAgent: tAgentCat('researchAgent'),
    writingAgent: tAgentCat('writingAgent'),
    dataAgent: tAgentCat('dataAgent'),
    customerSupportAgent: tAgentCat('customerSupportAgent'),
    salesAgent: tAgentCat('salesAgent'),
    personalAssistant: tAgentCat('personalAssistant'),
    creativeAgent: tAgentCat('creativeAgent'),
    workflowAgent: tAgentCat('workflowAgent'),
    analyticsAgent: tAgentCat('analyticsAgent')
  };

  // Check if AI Tools is selected (id '1' is AI Tools, id '2' is AI Agents)
  const isAiToolsSelected = activeTenant.id === '1';

  // Get navigation items and categories based on active tenant
  const currentNavItems = isAiToolsSelected
    ? getAiToolsNavItems(locale, navTranslations)
    : getAiAgentsNavItems(locale, navTranslations);
  const currentCategories = isAiToolsSelected
    ? getToolCategoriesForSidebar(locale, toolCategoryTranslations)
    : getAgentCategoriesForSidebar(locale, agentCategoryTranslations);
  const categoryLabel = isAiToolsSelected
    ? tSidebar('toolsCategories')
    : tSidebar('agentsCategories');
  const categoryUrl = isAiToolsSelected
    ? `/${locale}/tools/categories`
    : `/${locale}/agents/categories`;

  // Simulate loading navigation items when tenant changes
  React.useEffect(() => {
    // Only show loading if we've loaded the initial tenant from localStorage
    if (hasLoadedInitialTenant) {
      setIsLoadingNavItems(true);
      const navItemsTimer = setTimeout(() => {
        setIsLoadingNavItems(false);
      }, 800); // 800ms loading time for nav items

      return () => clearTimeout(navItemsTimer);
    } else {
      // On initial load, show content immediately after localStorage is checked
      setIsLoadingNavItems(false);
    }
  }, [activeTenant.id, hasLoadedInitialTenant]);

  // Simulate loading categories when tenant changes
  React.useEffect(() => {
    // Only show loading if we've loaded the initial tenant from localStorage
    if (hasLoadedInitialTenant) {
      setIsLoadingCategories(true);
      const categoriesTimer = setTimeout(() => {
        setIsLoadingCategories(false);
      }, 1200); // 1200ms loading time for categories (slightly longer)

      return () => clearTimeout(categoriesTimer);
    } else {
      // On initial load, show content immediately after localStorage is checked
      setIsLoadingCategories(false);
    }
  }, [activeTenant.id, hasLoadedInitialTenant]);

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, [isOpen]);

  return (
    <Sidebar collapsible='icon' side={sidebarSide}>
      <SidebarHeader className='border-border'>
        <OrgSwitcher
          tenants={tenants}
          defaultTenant={activeTenant}
          onTenantSwitch={handleSwitchTenant}
        />
      </SidebarHeader>

      {/* Dynamic layout based on viewport height:
          - Height >= 700px: Fixed header with scrollable categories
          - Height < 700px: Single scrollable container for all content */}
      {isLargeViewport ? (
        // Large viewport: Fixed header with scrollable content
        <>
          <div className='sidebar-fixed-header flex-shrink-0 bg-transparent'>
            {/* Fixed Navigation Items (Chat, AI Tools, Categories) */}
            {isLoadingNavItems ? (
              <SidebarNavSkeleton navItemsCount={3} />
            ) : (
              <SidebarGroup>
                <SidebarGroupLabel>{tSidebar('overview')}</SidebarGroupLabel>
                <SidebarMenu>
                  {currentNavItems.map((item: NavItem) => {
                    const Icon = item.icon ? Icons[item.icon] : Icons.logo;
                    return item?.items && item?.items?.length > 0 ? (
                      <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className='group/collapsible'
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              tooltip={item.title}
                              isActive={pathname === item.url}
                              className='data-[active=true]:bg-sidebar-accent/60 data-[active=true]:border-sidebar-accent/20 transition-all duration-200 data-[active=true]:border data-[active=true]:backdrop-blur-sm'
                            >
                              {item.icon && <Icon className='h-4 w-4' />}
                              <span className='group-data-[collapsible=icon]:hidden'>
                                {item.title}
                              </span>
                              <IconChevronRight
                                className={cn(
                                  'ml-auto transition-transform duration-200 group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-90',
                                  locale === 'ar' &&
                                    'mr-auto ml-0 rotate-180 group-data-[state=open]/collapsible:rotate-270'
                                )}
                              />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items?.map((subItem: NavItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname === subItem.url}
                                    className='data-[active=true]:bg-sidebar-accent/60 data-[active=true]:border-sidebar-accent/20 transition-all duration-200 data-[active=true]:border data-[active=true]:backdrop-blur-sm'
                                  >
                                    <Link href={subItem.url!}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ) : (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild={!item.disabled}
                          tooltip={item.title}
                          isActive={pathname === item.url}
                          className={cn(
                            'data-[active=true]:bg-sidebar-accent/60 data-[active=true]:border-sidebar-accent/20 transition-all duration-200 data-[active=true]:border data-[active=true]:backdrop-blur-sm',
                            item.disabled &&
                              'cursor-not-allowed opacity-80 hover:bg-transparent'
                          )}
                        >
                          {item.disabled ? (
                            <div className='flex w-full items-center justify-between py-2'>
                              <div className='flex items-center gap-2'>
                                <Icon className='h-4 w-4' />
                                <span className='group-data-[collapsible=icon]:hidden'>
                                  {item.title}
                                </span>
                              </div>
                              {item.badge && (
                                <Badge
                                  variant={item.badge.variant ?? 'default'}
                                  className='from-primary/90 via-primary/80 to-primary/70 text-primary-foreground border-0 bg-gradient-to-r shadow-sm group-data-[collapsible=icon]:hidden'
                                >
                                  {item.badge.text}
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <Link
                              href={item.url!}
                              className='flex w-full items-center justify-between'
                            >
                              <div className='flex items-center gap-2'>
                                <Icon className='h-4 w-4' />
                                <span className='group-data-[collapsible=icon]:hidden'>
                                  {item.title}
                                </span>
                              </div>
                              {item.badge && (
                                <Badge
                                  variant={item.badge.variant ?? 'default'}
                                  className='from-primary/90 via-primary/80 to-primary/70 text-primary-foreground border-0 bg-gradient-to-r shadow-sm group-data-[collapsible=icon]:hidden'
                                >
                                  {item.badge.text}
                                </Badge>
                              )}
                            </Link>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroup>
            )}
          </div>

          <SidebarContent className='sidebar-content-transition flex min-h-0 flex-1 flex-col overflow-x-hidden'>
            {/* Scrollable Categories Container */}
            {(isMobile || state === 'expanded') &&
              (isLoadingCategories ? (
                <SidebarCategoriesSkeleton categoriesCount={8} />
              ) : (
                <SidebarGroup className='min-h-0 flex-1'>
                  <SidebarGroupLabel>
                    <Link
                      href={categoryUrl}
                      className='hover:text-sidebar-foreground cursor-pointer transition-colors'
                    >
                      <span
                        className={cn(
                          'inline-block transition-all duration-200',
                          pathname === categoryUrl
                            ? 'border-sidebar-accent text-sidebar-foreground bg-sidebar-accent/10 rounded-full border px-2.5 py-0.5'
                            : ''
                        )}
                      >
                        {categoryLabel}
                      </span>
                    </Link>
                  </SidebarGroupLabel>
                  <div className='relative min-h-0 flex-1'>
                    <div className='categories-scrollbar absolute inset-0 overflow-y-auto pb-2 ltr:pr-2 rtl:pl-2'>
                      <SidebarMenu className='space-y-1'>
                        {currentCategories.map((category: NavItem) => {
                          const CategoryIcon = category.icon
                            ? Icons[category.icon]
                            : Icons.logo;
                          return (
                            <SidebarMenuItem key={category.title}>
                              <SidebarMenuButton
                                asChild
                                tooltip={category.title}
                                isActive={pathname === category.url}
                                className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent/60 data-[active=true]:border-sidebar-accent/20 w-full justify-start transition-all duration-200 data-[active=true]:border data-[active=true]:backdrop-blur-sm'
                              >
                                <Link
                                  href={category.url!}
                                  className='flex w-full items-center gap-2'
                                >
                                  <CategoryIcon className='h-4 w-4 shrink-0' />
                                  <span className='flex-1 truncate group-data-[collapsible=icon]:hidden'>
                                    {category.title}
                                  </span>
                                  {category.count !== undefined && (
                                    <span className='bg-muted text-muted-foreground shrink-0 rounded-full px-2 py-0.5 text-xs font-medium group-data-[collapsible=icon]:hidden'>
                                      {category.count}
                                    </span>
                                  )}
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        })}
                      </SidebarMenu>
                    </div>
                  </div>
                </SidebarGroup>
              ))}
          </SidebarContent>
        </>
      ) : (
        // Small viewport: Single scrollable container
        <SidebarContent className='sidebar-content-transition flex flex-col overflow-x-hidden bg-transparent'>
          <div className='min-h-0 flex-1'>
            <div className='categories-scrollbar sidebar-scrollable-container h-full overflow-y-auto pb-2 ltr:pr-2 rtl:pl-2'>
              {/* Navigation Items */}
              {isLoadingNavItems ? (
                <SidebarNavSkeleton navItemsCount={3} />
              ) : (
                <SidebarGroup className='flex-shrink-0'>
                  <SidebarGroupLabel>{tSidebar('overview')}</SidebarGroupLabel>
                  <SidebarMenu>
                    {currentNavItems.map((item: NavItem) => {
                      const Icon = item.icon ? Icons[item.icon] : Icons.logo;
                      return item?.items && item?.items?.length > 0 ? (
                        <Collapsible
                          key={item.title}
                          asChild
                          defaultOpen={item.isActive}
                          className='group/collapsible'
                        >
                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton
                                tooltip={item.title}
                                isActive={pathname === item.url}
                                className='data-[active=true]:bg-sidebar-accent/60 data-[active=true]:border-sidebar-accent/20 transition-all duration-200 data-[active=true]:border data-[active=true]:backdrop-blur-sm'
                              >
                                {item.icon && <Icon className='h-4 w-4' />}
                                <span className='group-data-[collapsible=icon]:hidden'>
                                  {item.title}
                                </span>
                                <IconChevronRight
                                  className={cn(
                                    'ml-auto transition-transform duration-200 group-data-[collapsible=icon]:hidden group-data-[state=open]/collapsible:rotate-90',
                                    locale === 'ar' &&
                                      'mr-auto ml-0 rotate-180 group-data-[state=open]/collapsible:rotate-270'
                                  )}
                                />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item.items?.map((subItem: NavItem) => (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={pathname === subItem.url}
                                      className='data-[active=true]:bg-sidebar-accent/60 data-[active=true]:border-sidebar-accent/20 transition-all duration-200 data-[active=true]:border data-[active=true]:backdrop-blur-sm'
                                    >
                                      <Link href={subItem.url!}>
                                        <span>{subItem.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                      ) : (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild={!item.disabled}
                            tooltip={item.title}
                            isActive={pathname === item.url}
                            className={cn(
                              'data-[active=true]:bg-sidebar-accent/60 data-[active=true]:border-sidebar-accent/20 transition-all duration-200 data-[active=true]:border data-[active=true]:backdrop-blur-sm',
                              item.disabled &&
                                'cursor-not-allowed opacity-80 hover:bg-transparent'
                            )}
                          >
                            {item.disabled ? (
                              <div className='flex w-full items-center justify-between py-2'>
                                <div className='flex items-center gap-2'>
                                  <Icon className='h-4 w-4' />
                                  <span className='group-data-[collapsible=icon]:hidden'>
                                    {item.title}
                                  </span>
                                </div>
                                {item.badge && (
                                  <Badge
                                    variant={item.badge.variant ?? 'default'}
                                    className='from-primary/90 via-primary/80 to-primary/70 text-primary-foreground border-0 bg-gradient-to-r shadow-sm group-data-[collapsible=icon]:hidden'
                                  >
                                    {item.badge.text}
                                  </Badge>
                                )}
                              </div>
                            ) : (
                              <Link
                                href={item.url!}
                                className='flex w-full items-center justify-between'
                              >
                                <div className='flex items-center gap-2'>
                                  <Icon className='h-4 w-4' />
                                  <span className='group-data-[collapsible=icon]:hidden'>
                                    {item.title}
                                  </span>
                                </div>
                                {item.badge && (
                                  <Badge
                                    variant={item.badge.variant ?? 'default'}
                                    className='from-primary/90 via-primary/80 to-primary/70 text-primary-foreground border-0 bg-gradient-to-r shadow-sm group-data-[collapsible=icon]:hidden'
                                  >
                                    {item.badge.text}
                                  </Badge>
                                )}
                              </Link>
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroup>
              )}

              {/* Categories Container */}
              {(isMobile || state === 'expanded') &&
                (isLoadingCategories ? (
                  <SidebarCategoriesSkeleton categoriesCount={8} />
                ) : (
                  <SidebarGroup>
                    <SidebarGroupLabel>
                      <Link
                        href={categoryUrl}
                        className='hover:text-sidebar-foreground cursor-pointer transition-colors'
                      >
                        <span
                          className={cn(
                            'inline-block transition-all duration-200',
                            pathname === categoryUrl
                              ? 'border-sidebar-accent text-sidebar-foreground bg-sidebar-accent/10 rounded-full border px-2.5 py-0.5'
                              : ''
                          )}
                        >
                          {categoryLabel}
                        </span>
                      </Link>
                    </SidebarGroupLabel>
                    <SidebarMenu className='space-y-1'>
                      {currentCategories.map((category: NavItem) => {
                        const CategoryIcon = category.icon
                          ? Icons[category.icon]
                          : Icons.logo;
                        return (
                          <SidebarMenuItem key={category.title}>
                            <SidebarMenuButton
                              asChild
                              tooltip={category.title}
                              isActive={pathname === category.url}
                              className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent/60 data-[active=true]:border-sidebar-accent/20 w-full justify-start transition-all duration-200 data-[active=true]:border data-[active=true]:backdrop-blur-sm'
                            >
                              <Link
                                href={category.url!}
                                className='flex w-full items-center gap-2'
                              >
                                <CategoryIcon className='h-4 w-4 shrink-0' />
                                <span className='flex-1 truncate group-data-[collapsible=icon]:hidden'>
                                  {category.title}
                                </span>
                                {category.count !== undefined && (
                                  <span className='bg-muted text-muted-foreground shrink-0 rounded-full px-2 py-0.5 text-xs font-medium group-data-[collapsible=icon]:hidden'>
                                    {category.count}
                                  </span>
                                )}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroup>
                ))}
            </div>
          </div>
        </SidebarContent>
      )}

      <SidebarFooter className='border-sidebar-border bg-background/60 supports-[backdrop-filter]:bg-background/50 backdrop-blur'>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200'
                >
                  {user && (
                    <UserAvatarProfile
                      className='h-8 w-8 rounded-lg'
                      showInfo
                      user={user}
                    />
                  )}
                  <IconChevronsDown className='size-4 transition-transform duration-200 group-data-[collapsible=icon]:hidden ltr:ml-auto rtl:mr-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='border-sidebar-border bg-sidebar w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg shadow-lg'
                side='bottom'
                align='end'
                sideOffset={4}
              >
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='px-1 py-1.5 text-sm'>
                    {user && (
                      <UserAvatarProfile
                        className='h-8 w-8 rounded-lg'
                        showInfo
                        user={user}
                      />
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='bg-sidebar-border' />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.push(`/${locale}/profile`)}
                    className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer transition-colors duration-200'
                  >
                    <IconUserCircle
                      className={cn(
                        'h-4 w-4',
                        locale === 'ar' ? 'ml-2' : 'mr-2'
                      )}
                    />
                    {tSidebar('account')}
                  </DropdownMenuItem>
                  <DropdownMenuItem className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer transition-colors duration-200'>
                    <IconCreditCard
                      className={cn(
                        'h-4 w-4',
                        locale === 'ar' ? 'ml-2' : 'mr-2'
                      )}
                    />
                    {tSidebar('billing')}
                  </DropdownMenuItem>
                  <DropdownMenuItem className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer transition-colors duration-200'>
                    <IconBell
                      className={cn(
                        'h-4 w-4',
                        locale === 'ar' ? 'ml-2' : 'mr-2'
                      )}
                    />
                    {tSidebar('notifications')}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className='bg-sidebar-border' />
                <DropdownMenuItem
                  onClick={async () => {
                    try {
                      await logout();
                    } catch (error) {
                      // Error is handled by the AuthContext
                    }
                  }}
                  disabled={authLoading}
                  className='hover:bg-destructive hover:text-destructive-foreground cursor-pointer transition-colors duration-200'
                >
                  <IconLogout
                    className={cn('h-4 w-4', locale === 'ar' ? 'ml-2' : 'mr-2')}
                  />
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
