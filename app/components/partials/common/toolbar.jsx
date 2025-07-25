'use client';

import { usePathname } from 'next/navigation';
import { CLIENT_MENU_SIDEBAR } from '@/config/client-menu.config';
import { FREELANCER_MENU_SIDEBAR } from '@/config/freelancer-menu.config';
import { useAuth } from '@/hooks/auth/use-auth';
import { useMenu } from '@/hooks/use-menu';

const Toolbar = ({ children }) => {
  return (
    <div className="flex flex-wrap items-center lg:items-end justify-between gap-5 pb-7.5">
      {children}
    </div>
  );
};

const ToolbarActions = ({ children }) => {
  return <div className="flex items-center gap-2.5">{children}</div>;
};

const ToolbarPageTitle = ({ text }) => {
  const { data: user } = useAuth();
  const MENU_SIDEBAR =
    user?.type === 'client' ? CLIENT_MENU_SIDEBAR : FREELANCER_MENU_SIDEBAR;
  const pathname = usePathname();
  const { getCurrentItem } = useMenu(pathname);
  const item = getCurrentItem(MENU_SIDEBAR);

  return (
    <h1 className="text-xl font-medium leading-none text-mono">
      {text ?? item?.title}
    </h1>
  );
};

const ToolbarDescription = ({ children }) => {
  return (
    <div className="flex items-center gap-2 text-sm font-normal text-secondary-foreground">
      {children}
    </div>
  );
};

const ToolbarHeading = ({ children }) => {
  return <div className="flex flex-col justify-center gap-2">{children}</div>;
};

export {
  Toolbar,
  ToolbarActions,
  ToolbarPageTitle,
  ToolbarHeading,
  ToolbarDescription,
};
