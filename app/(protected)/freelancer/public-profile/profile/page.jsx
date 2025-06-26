'use client';

import { Fragment, useState } from 'react';
import { UserHero } from '@/partials/common/user-hero';
import { DropdownMenu9 } from '@/partials/dropdown-menu/dropdown-menu-9';
import { Navbar, NavbarActions } from '@/partials/navbar/navbar';
import { EllipsisVertical, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { PageMenu } from '@/app/(protected)/freelancer/public-profile/page-menu';
import { ProfileDefaultContent } from '@/app/(protected)/freelancer/public-profile/profile/content';
import { AvatarDialog } from './dialogs/avatar-dialog';

export default function ProfileDefaultPage() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Fragment>
      <UserHero openDialog={() => setOpenDialog(true)} />
      <Container>
        <Navbar>
          <PageMenu />
          <NavbarActions>
            <Button>
              <Users /> Connect
            </Button>
            <DropdownMenu9
              trigger={
                <Button variant="outline" mode="icon">
                  <EllipsisVertical />
                </Button>
              }
            />
          </NavbarActions>
        </Navbar>
      </Container>
      <Container>
        <ProfileDefaultContent />
        <AvatarDialog
          open={openDialog}
          closeDialog={() => setOpenDialog(false)}
        />
      </Container>
    </Fragment>
  );
}
