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
    <SidebarGroup>
      <SidebarGroupLabel>
        <Skeleton className='h-4 w-20' />
      </SidebarGroupLabel>
      <div className='relative'>
        <div className='max-h-[50vh] min-h-[100px] overflow-y-auto pr-2'>
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
