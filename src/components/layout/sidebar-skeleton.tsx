import { Skeleton } from '@/components/ui/skeleton';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton
} from '@/components/ui/sidebar';

interface SidebarSkeletonProps {
  navItemsCount?: number;
  categoriesCount?: number;
}

export function SidebarNavSkeleton({
  navItemsCount = 3
}: {
  navItemsCount?: number;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <Skeleton className='h-4 w-16' />
      </SidebarGroupLabel>
      <SidebarMenu>
        {Array.from({ length: navItemsCount }).map((_, i) => (
          <SidebarMenuItem key={i}>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export function SidebarCategoriesSkeleton({
  categoriesCount = 8
}: {
  categoriesCount?: number;
}) {
  return (
    <SidebarGroup className='min-h-[200px] flex-1'>
      <SidebarGroupLabel>
        <Skeleton className='h-4 w-20' />
      </SidebarGroupLabel>
      <div className='relative min-h-0 flex-1'>
        <div className='categories-scrollbar absolute inset-0 overflow-y-auto pr-2 pb-2'>
          <SidebarMenu className='space-y-1'>
            {Array.from({ length: categoriesCount }).map((_, i) => (
              <SidebarMenuItem key={i}>
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </div>
    </SidebarGroup>
  );
}

export function SidebarContentSkeleton({
  navItemsCount = 3,
  categoriesCount = 8
}: SidebarSkeletonProps) {
  return (
    <>
      <SidebarNavSkeleton navItemsCount={navItemsCount} />
      <SidebarCategoriesSkeleton categoriesCount={categoriesCount} />
    </>
  );
}
