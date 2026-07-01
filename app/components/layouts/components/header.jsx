'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserDropdownMenu } from '@/partials/topbar/user-dropdown-menu';
import { Bell, Menu, Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/auth/use-auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Container } from '@/components/common/container';
import { MegaMenu } from './mega-menu';
import { SidebarMenu } from './sidebar-menu';

export function Header() {
  const { data: user } = useAuth();
  const logoHref = user?.type ? `/${user.type}` : '/';
  const [isSidebarSheetOpen, setIsSidebarSheetOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const pathname = usePathname();
  const mobileMode = useIsMobile();

  const scrollPosition = useScrollPosition();
  const headerSticky = scrollPosition > 0;

  // Close sheet when route changes
  useEffect(() => {
    setIsSidebarSheetOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'header fixed top-0 z-10 start-0 flex items-stretch shrink-0 border-b border-transparent bg-background end-0 pe-[var(--removed-body-scroll-bar-size,0px)]',
        headerSticky && 'border-b border-border',
      )}
      ref={(el) =>
        el && el.style.setProperty('inset-inline-start', '0', 'important')
      }
    >
      <Container className="flex justify-between items-stretch lg:gap-4">
        <div className="flex items-center gap-3">
          {/* Header Logo */}
          <Link href={logoHref} className="shrink-0">
            <img
              src={toAbsoluteUrl(
                isDark
                  ? '/media/app/default-logo-dark.svg'
                  : '/media/app/default-logo.svg',
              )}
              className="h-[40px] w-full"
              alt="Logo Image"
            />
          </Link>

          {mobileMode && (
            <Sheet
              open={isSidebarSheetOpen}
              onOpenChange={setIsSidebarSheetOpen}
            >
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" mode="icon">
                  <Menu className="text-muted-foreground/70" />
                </Button>
              </SheetTrigger>
              <SheetContent
                className="p-0 gap-0 w-[275px]"
                side="left"
                close={false}
              >
                <SheetHeader className="p-0 space-y-0" />
                <SheetBody className="p-0 overflow-y-auto">
                  <SidebarMenu />
                </SheetBody>
              </SheetContent>
            </Sheet>
          )}

          {/* Main Content (desktop MegaMenu) */}
          {!mobileMode && <MegaMenu />}
        </div>

        {/* HeaderTopbar */}
        <div className="flex items-center gap-3">
          {!mobileMode && (
            <Button
              variant="ghost"
              mode="icon"
              shape="circle"
              className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
            >
              <Search className="size-4.5!" />
            </Button>
          )}

          <Button
            variant="ghost"
            mode="icon"
            shape="circle"
            className="size-9 hover:bg-primary/10 hover:[&_svg]:text-primary"
          >
            <Bell className="size-4.5!" />
          </Button>

          <UserDropdownMenu
            trigger={
              <img
                className="size-9 rounded-full border-2 border-success shrink-0 cursor-pointer"
                src={toAbsoluteUrl('/media/avatars/300-2.png')}
                alt="User Avatar"
              />
            }
          />
        </div>
      </Container>
    </header>
  );
}
