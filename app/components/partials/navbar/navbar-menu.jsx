'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useMenu } from '@/hooks/use-menu';
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';

const NavbarMenu = ({ items }) => {
  const pathname = usePathname();
  const { isActive } = useMenu(pathname);

  const buildMenu = (items) => {
    console.log('items', items);
    return items.map((item, index) => {
      return (
        <MenubarMenu key={index}>
          <MenubarTrigger
            asChild
            className={cn(
              'flex items-center px-3 py-3.5 text-sm text-secondary-foreground',
              'rounded-none border-b-2 border-transparent bg-transparent',
              'hover:text-primary hover:bg-transparent',
              'data-[state=open]:text-primary data-[active=true]:border-primary',
              isActive(item.path) && 'text-primary border-primary',
            )}
          >
            <Link href={item.path || ''} data-active={isActive(item.path)}>
              {item.title}
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
      );
    });
  };

  return (
    <div className="grid">
      <div className="scrollable-x-auto">
        <Menubar className="flex items-stretch gap-3 border-none bg-transparent p-0 h-auto">
          {buildMenu(items)}
        </Menubar>
      </div>
    </div>
  );
};

export { NavbarMenu };
