'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { CLIENT_MENU_SIDEBAR } from '@/config/client-menu.config';
import { FREELANCER_MENU_SIDEBAR } from '@/config/freelancer-menu.config';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/auth/use-auth';
import { useMenu } from '@/hooks/use-menu';

function Toolbar({ children }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5">
      {children}
    </div>
  );
}

function ToolbarActions({ children }) {
  return <div className="flex items-center gap-2.5">{children}</div>;
}

function ToolbarBreadcrumbs() {
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
    <div className="flex [.header_&]:below-lg:hidden items-center gap-1.25 text-xs lg:text-sm font-medium mb-2.5 lg:mb-0">
      <div className="breadcrumb flex items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const active = item.path ? isActive(item.path) : false;

          return (
            <Fragment key={index}>
              {item.path ? (
                <Link
                  href={item.path}
                  className={cn(
                    'flex items-center gap-1',
                    active
                      ? 'text-mono'
                      : 'text-muted-foreground hover:text-primary',
                  )}
                >
                  {item.title}
                </Link>
              ) : (
                <span
                  className={cn(isLast ? 'text-mono' : 'text-muted-foreground')}
                >
                  {item.title}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="size-3.5 muted-foreground" />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function ToolbarHeading({ title = '', description }) {
  const { data: user } = useAuth();
  const MENU_SIDEBAR =
    user?.type === 'client' ? CLIENT_MENU_SIDEBAR : FREELANCER_MENU_SIDEBAR;
  const pathname = usePathname();
  const { getCurrentItem } = useMenu(pathname);
  const item = getCurrentItem(MENU_SIDEBAR);

  return (
    <div className="flex flex-col justify-center gap-2">
      <h1 className="text-xl font-medium leading-none text-mono">
        {title || item?.title || 'Untitled'}
      </h1>
      {description && (
        <div className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
          {description}
        </div>
      )}
    </div>
  );
}

export { Toolbar, ToolbarActions, ToolbarBreadcrumbs, ToolbarHeading };
