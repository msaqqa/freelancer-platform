'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { CLIENT_MENU_SIDEBAR } from '@/config/client-menu.config';
import { FREELANCER_MENU_SIDEBAR } from '@/config/freelancer-menu.config';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/auth/use-auth';
import { useMenu } from '@/hooks/use-menu';

export function Breadcrumb() {
  const { data: user } = useAuth();
  const MENU_SIDEBAR =
    user?.type === 'client' ? CLIENT_MENU_SIDEBAR : FREELANCER_MENU_SIDEBAR;
  const pathname = usePathname();
  const { getBreadcrumb, isActive } = useMenu(pathname);
  const items = getBreadcrumb(MENU_SIDEBAR);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.25 text-xs lg:text-sm font-medium mb-2.5 lg:mb-0">
      {items.map((item, index) => {
        const last = index === items.length - 1;
        const active = item.path ? isActive(item.path) : false;

        return (
          <Fragment key={`root-${index}`}>
            <span
              className={cn(active ? 'text-mono' : 'text-secondary-foreground')}
              key={`item-${index}`}
            >
              {item.title}
            </span>
            {!last && (
              <ChevronRight
                className="size-3.5 text-muted-foreground"
                key={`separator-${index}`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
