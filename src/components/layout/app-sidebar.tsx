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
  aiToolsNavItems,
  aiAgentsNavItems,
  aiToolsAdditionalCategories,
  aiAgentsAdditionalCategories
} from '@/constants/data';
import {
  SidebarNavSkeleton,
  SidebarCategoriesSkeleton
} from './sidebar-skeleton';
import { useMediaQuery } from '@/hooks/use-media-query';
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
  fullName: 'Demo User',
  emailAddresses: [{ emailAddress: 'demo@example.com' }],
  imageUrl: ''
};

export default function AppSidebar() {
  const pathname = usePathname();
  const { isOpen } = useMediaQuery();
  const { open } = useSidebar();
  // TEMPORARILY DISABLED FOR LARAVEL AUTH MIGRATION
  // const { user } = useUser();
  const user = demoUser; // Using demo user instead
  const router = useRouter();
  const locale = useLocale();

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
    activeTenant.name === 'AI Tools' ? aiToolsNavItems : aiAgentsNavItems;
  const currentCategories =
    activeTenant.name === 'AI Tools'
      ? aiToolsAdditionalCategories
      : aiAgentsAdditionalCategories;
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
      <SidebarHeader>
        <OrgSwitcher
          tenants={tenants}
          defaultTenant={activeTenant}
          onTenantSwitch={handleSwitchTenant}
        />
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        {/* Navigation Items with Loading State */}
        {isLoadingNavItems ? (
          <SidebarNavSkeleton navItemsCount={3} />
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

        {/* Scrollable Categories Container with Loading State - Only show when sidebar is open */}
        {open &&
          (isLoadingCategories ? (
            <SidebarCategoriesSkeleton categoriesCount={8} />
          ) : (
            <SidebarGroup>
              <SidebarGroupLabel>{categoryLabel}</SidebarGroupLabel>
              <div className='relative'>
                <div className='categories-scrollbar max-h-[50vh] min-h-[100px] overflow-y-auto pr-2'>
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
                            className='w-full justify-start transition-colors duration-200'
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                >
                  {user && (
                    <UserAvatarProfile
                      className='h-8 w-8 rounded-lg'
                      showInfo
                      user={user}
                    />
                  )}
                  <IconChevronsDown className='ml-auto size-4' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                side='bottom'
                align='end'
                sideOffset={4}
              >
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='px-1 py-1.5'>
                    {user && (
                      <UserAvatarProfile
                        className='h-8 w-8 rounded-lg'
                        showInfo
                        user={user}
                      />
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.push('/dashboard/profile')}
                  >
                    <IconUserCircle className='mr-2 h-4 w-4' />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconCreditCard className='mr-2 h-4 w-4' />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconBell className='mr-2 h-4 w-4' />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
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
