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
import {
  getAiToolsNavItems,
  getAiAgentsNavItems,
  getAiToolsAdditionalCategories,
  getAiAgentsAdditionalCategories
} from '@/constants/data';
import {
  SidebarNavSkeleton,
  SidebarCategoriesSkeleton
} from './sidebar-skeleton';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useWindowHeight } from '@/hooks/use-window-height';
// TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION
// import { useUser } from '@clerk/nextjs';
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
import { useLocale } from 'next-intl';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Icons } from '../icons';
import { OrgSwitcher } from '../org-switcher';
export const company = {
  name: 'Acme Inc',
  logo: IconPhotoUp,
  plan: 'Enterprise'
};

const tenants = [
  { id: '1', name: 'AI Tools' },
  { id: '2', name: 'AI Agents' }
];

// Demo user for testing without authentication
const demoUser = {
  fullName: 'Ayman Ismail',
  emailAddresses: [{ emailAddress: 'ayman@example.com' }],
  imageUrl: ''
};

export default function AppSidebar() {
  const pathname = usePathname();
  const { isOpen } = useMediaQuery();
  const { state, isMobile } = useSidebar();
  const windowHeight = useWindowHeight();
  // TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION
  // const { user } = useUser();
  const user = demoUser; // Using demo user instead
  const router = useRouter();
  const locale = useLocale();

  // Determine if we should use fixed header behavior (when height >= 700px)
  const isLargeViewport = windowHeight >= 700;

  // State for active tenant - always start with first tenant to avoid hydration mismatch
  const [activeTenant, setActiveTenant] = React.useState(tenants[0]);

  // Track if we've loaded the initial tenant from localStorage
  const [hasLoadedInitialTenant, setHasLoadedInitialTenant] =
    React.useState(false);

  // Loading states for sidebar navigation
  const [isLoadingNavItems, setIsLoadingNavItems] = React.useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = React.useState(true);

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
  }, []); // Run only once on mount

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

  // Get navigation items and categories based on active tenant
  const currentNavItems =
    activeTenant.name === 'AI Tools'
      ? getAiToolsNavItems(locale)
      : getAiAgentsNavItems(locale);
  const currentCategories =
    activeTenant.name === 'AI Tools'
      ? getAiToolsAdditionalCategories(locale)
      : getAiAgentsAdditionalCategories(locale);
  const categoryLabel =
    activeTenant.name === 'AI Tools' ? 'Categories' : 'Agent Types';

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
      <SidebarHeader className='border-sidebar-border bg-sidebar/95 supports-[backdrop-filter]:bg-sidebar/60 backdrop-blur'>
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
          <div className='bg-sidebar/95 supports-[backdrop-filter]:bg-sidebar/60 sidebar-fixed-header flex-shrink-0 backdrop-blur'>
            {/* Fixed Navigation Items (Chat, AI Tools, Categories) */}
            {isLoadingNavItems ? (
              <div className='p-2'>
                <SidebarNavSkeleton navItemsCount={3} />
              </div>
            ) : (
              <SidebarGroup>
                <SidebarGroupLabel>Overview</SidebarGroupLabel>
                <SidebarMenu>
                  {currentNavItems.map((item) => {
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
                            >
                              {item.icon && <Icon />}
                              <span>{item.title}</span>
                              <IconChevronRight
                                className={cn(
                                  'ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90',
                                  locale === 'ar' &&
                                    'mr-auto ml-0 rotate-180 group-data-[state=open]/collapsible:rotate-270'
                                )}
                              />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items?.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname === subItem.url}
                                  >
                                    <Link href={subItem.url}>
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
                          asChild
                          tooltip={item.title}
                          isActive={pathname === item.url}
                        >
                          <Link href={item.url}>
                            <Icon />
                            <span>{item.title}</span>
                          </Link>
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
                  <SidebarGroupLabel>{categoryLabel}</SidebarGroupLabel>
                  <div className='relative min-h-0 flex-1'>
                    <div className='categories-scrollbar absolute inset-0 overflow-y-auto pr-2 pb-2'>
                      <SidebarMenu className='space-y-1'>
                        {currentCategories.map((category) => {
                          const CategoryIcon = category.icon
                            ? Icons[category.icon]
                            : Icons.logo;
                          return (
                            <SidebarMenuItem key={category.title}>
                              <SidebarMenuButton
                                asChild
                                tooltip={category.title}
                                isActive={pathname === category.url}
                                className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full justify-start transition-colors duration-200'
                              >
                                <Link href={category.url}>
                                  <CategoryIcon className='h-4 w-4' />
                                  <span>{category.title}</span>
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
        <SidebarContent className='sidebar-content-transition flex flex-col overflow-x-hidden'>
          <div className='min-h-0 flex-1'>
            <div className='categories-scrollbar sidebar-scrollable-container h-full overflow-y-auto pr-2 pb-2'>
              {/* Navigation Items */}
              {isLoadingNavItems ? (
                <div className='p-2'>
                  <SidebarNavSkeleton navItemsCount={3} />
                </div>
              ) : (
                <SidebarGroup className='flex-shrink-0'>
                  <SidebarGroupLabel>Overview</SidebarGroupLabel>
                  <SidebarMenu>
                    {currentNavItems.map((item) => {
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
                              >
                                {item.icon && <Icon />}
                                <span>{item.title}</span>
                                <IconChevronRight
                                  className={cn(
                                    'ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90',
                                    locale === 'ar' &&
                                      'mr-auto ml-0 rotate-180 group-data-[state=open]/collapsible:rotate-270'
                                  )}
                                />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item.items?.map((subItem) => (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={pathname === subItem.url}
                                    >
                                      <Link href={subItem.url}>
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
                            asChild
                            tooltip={item.title}
                            isActive={pathname === item.url}
                          >
                            <Link href={item.url}>
                              <Icon />
                              <span>{item.title}</span>
                            </Link>
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
                  <div className='p-2'>
                    <SidebarCategoriesSkeleton categoriesCount={8} />
                  </div>
                ) : (
                  <SidebarGroup>
                    <SidebarGroupLabel>{categoryLabel}</SidebarGroupLabel>
                    <SidebarMenu className='space-y-1'>
                      {currentCategories.map((category) => {
                        const CategoryIcon = category.icon
                          ? Icons[category.icon]
                          : Icons.logo;
                        return (
                          <SidebarMenuItem key={category.title}>
                            <SidebarMenuButton
                              asChild
                              tooltip={category.title}
                              isActive={pathname === category.url}
                              className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full justify-start transition-colors duration-200'
                            >
                              <Link href={category.url}>
                                <CategoryIcon className='h-4 w-4' />
                                <span>{category.title}</span>
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

      <SidebarFooter className='border-sidebar-border bg-sidebar/95 supports-[backdrop-filter]:bg-sidebar/60 backdrop-blur'>
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
                  <IconChevronsDown className='ml-auto size-4 transition-transform duration-200' />
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
                    onClick={() => router.push('/dashboard/profile')}
                    className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer transition-colors duration-200'
                  >
                    <IconUserCircle className='mr-2 h-4 w-4' />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer transition-colors duration-200'>
                    <IconCreditCard className='mr-2 h-4 w-4' />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem className='hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer transition-colors duration-200'>
                    <IconBell className='mr-2 h-4 w-4' />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className='bg-sidebar-border' />
                <DropdownMenuItem className='hover:bg-destructive hover:text-destructive-foreground cursor-pointer transition-colors duration-200'>
                  <IconLogout className='mr-2 h-4 w-4' />
                  {/* TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION */}
                  {/* <SignOutButton redirectUrl='/auth/sign-in' /> */}
                  <span className='text-muted-foreground'>
                    Sign Out (Disabled)
                  </span>
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
