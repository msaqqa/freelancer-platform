'use client';

import { Navbar } from '@/partials/navbar/navbar';
import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { CLIENT_MENU_SIDEBAR } from '@/config/client-menu.config';
import { useMenuTranslation } from '@/hooks/use-menu-translation';
import { useSettings } from '@/providers/settings-provider';
import { Container } from '@/components/common/container';

const PageNavbar = () => {
  const { settings } = useSettings();
  const translatedMenu = useMenuTranslation(CLIENT_MENU_SIDEBAR);
  const accountMenuConfig = translatedMenu?.['3']?.children;

  if (accountMenuConfig && settings?.layout === 'demo1') {
    return (
      <Navbar>
        <Container>
          <NavbarMenu items={accountMenuConfig} />
        </Container>
      </Navbar>
    );
  } else {
    return <></>;
  }
};

export { PageNavbar };
