'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CLIENT_MENU_MEGA } from '@/config/client-menu.config';
import { FREELANCER_MENU_MEGA } from '@/config/freelancer-menu.config';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/auth/use-auth';
import { useMenu } from '@/hooks/use-menu';
import { useMenuTranslation } from '@/hooks/use-menu-translation';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

export function MegaMenu() {
  const { data: user } = useAuth();
  const rawMenu =
    user?.type === 'client' ? CLIENT_MENU_MEGA : FREELANCER_MENU_MEGA;
  const MENU_MEGA = useMenuTranslation(rawMenu);
  const pathname = usePathname();
  const { isActive, hasActiveChild } = useMenu(pathname);
  const homeItem = MENU_MEGA[0];
  const profileItem = MENU_MEGA[1];
  const servicesItem = MENU_MEGA[2];
  const experienceItem = MENU_MEGA[3];
  const workHistoryItem = MENU_MEGA[4];

  const linkClass = `
    text-sm text-secondary-foreground font-medium 
    hover:text-primary hover:bg-transparent 
    focus:text-primary focus:bg-transparent 
    data-[active=true]:text-primary data-[active=true]:bg-transparent 
    data-[state=open]:text-primary data-[state=open]:bg-transparent
  `;

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-0">
        {/* Home Item */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href={homeItem.path || '/'}
              className={cn(linkClass)}
              data-active={isActive(homeItem.path) || undefined}
            >
              {homeItem.title}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Profile Item */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href={profileItem.path}
              className={cn(linkClass)}
              data-active={isActive(profileItem.path) || undefined}
            >
              {profileItem.title}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Services Item */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href={servicesItem.path}
              className={cn(linkClass)}
              data-active={isActive(servicesItem.path) || undefined}
            >
              {servicesItem.title}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Experience Item */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href={experienceItem.path}
              className={cn(linkClass)}
              data-active={isActive(experienceItem.path) || undefined}
            >
              {experienceItem.title}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* WorkHistory Item */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href={workHistoryItem.path}
              className={cn(linkClass)}
              data-active={isActive(workHistoryItem.path) || undefined}
            >
              {workHistoryItem.title}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
