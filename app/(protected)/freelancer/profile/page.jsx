'use client';

import { Fragment, useState } from 'react';
import { UserHero } from '@/partials/common/user-hero';
import { Navbar, NavbarActions } from '@/partials/navbar/navbar';
import { Share } from 'lucide-react';
import { useAuth } from '@/hooks/auth/use-auth';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { PageMenu } from '@/app/(protected)/freelancer/page-menu';
import { ProfileDefaultContent } from '@/app/(protected)/freelancer/profile/content';
import { AvatarDialog } from './dialogs/avatar-dialog';

export default function ProfileDefaultPage() {
  const [openDialog, setOpenDialog] = useState(false);
  // const { data: user, isLoading } = useAuth();
  const user = {};
  const isLoading = false;
  return (
    <Fragment>
      <UserHero
        user={user}
        isLoading={isLoading}
        openDialog={() => setOpenDialog(true)}
      />
      <Container>
        <Navbar>
          <PageMenu />
          <NavbarActions>
            <Button>
              <Share /> Share
            </Button>
          </NavbarActions>
        </Navbar>
      </Container>
      <Container>
        <ProfileDefaultContent user={user} isLoading={isLoading} />
        <AvatarDialog
          open={openDialog}
          closeDialog={() => setOpenDialog(false)}
          user={user}
        />
      </Container>
    </Fragment>
  );
}
