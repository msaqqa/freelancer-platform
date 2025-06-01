'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { PageNavbar } from '../../client/account/page-navbar';
import { AccountSettingsSidebarContent } from './content';

export default function AccountSettingsSidebarPage() {
  return (
    <div className="flex flex-col items-center" style={{ flexGrow: '1' }}>
      <PageNavbar />
      <Container>
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle />
            <ToolbarDescription>
              Intuitive Access to In-Depth Customization
            </ToolbarDescription>
          </ToolbarHeading>
        </Toolbar>
      </Container>
      <Container>
        <AccountSettingsSidebarContent />
      </Container>
    </div>
  );
}
