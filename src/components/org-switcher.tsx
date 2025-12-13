'use client';

import { Check, ChevronsUpDown, Sparkles } from 'lucide-react';
import * as React from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

interface Tenant {
  id: string;
  name: string;
}

export function OrgSwitcher({
  tenants,
  defaultTenant,
  onTenantSwitch
}: {
  tenants: Tenant[];
  defaultTenant: Tenant;
  onTenantSwitch?: (tenantId: string) => void;
}) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [selectedTenant, setSelectedTenant] = React.useState<
    Tenant | undefined
  >(defaultTenant || (tenants.length > 0 ? tenants[0] : undefined));

  // Sync selectedTenant with defaultTenant prop changes
  React.useEffect(() => {
    if (defaultTenant) {
      setSelectedTenant(defaultTenant);
    }
  }, [defaultTenant]);

  const handleTenantSwitch = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    if (onTenantSwitch) {
      onTenantSwitch(tenant.id);
    }
  };

  if (!selectedTenant) {
    return null;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent'>
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    rotate: {
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    },
                    scale: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
                  }}
                >
                  <Sparkles className='h-6 w-6 text-current' />
                </motion.div>
              </div>
              <div className='flex flex-col items-start gap-0.5 leading-none'>
                <span className='font-semibold'>Select AI</span>
                <span>{selectedTenant.name}</span>
              </div>
              <ChevronsUpDown className='ms-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width]'
            align={isRTL ? 'end' : 'start'}
          >
            {tenants.map((tenant) => (
              <DropdownMenuItem
                key={tenant.id}
                onSelect={() => handleTenantSwitch(tenant)}
                disabled={tenant.id === selectedTenant.id}
                className={
                  tenant.id === selectedTenant.id
                    ? 'cursor-not-allowed opacity-50'
                    : ''
                }
              >
                {tenant.name}{' '}
                {tenant.id === selectedTenant.id && (
                  <Check className='ms-auto h-4 w-4' />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
