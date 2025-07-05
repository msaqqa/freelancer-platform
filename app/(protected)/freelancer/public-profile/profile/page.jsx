'use client';

import { Fragment, useState } from 'react';
import { UserHero } from '@/partials/common/user-hero';
import { Navbar } from '@/partials/navbar/navbar';
import { useAuth } from '@/hooks/auth/use-auth';
import { Container } from '@/components/common/container';
import { PageMenu } from '@/app/(protected)/freelancer/public-profile/page-menu';
import { ProfileDefaultContent } from '@/app/(protected)/freelancer/public-profile/profile/content';
import { AvatarDialog } from './dialogs/avatar-dialog';

export default function ProfileDefaultPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const { data: user, isLoading } = useAuth();
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
        </Navbar>
      </Container>
      <Container>
        <ProfileDefaultContent user={user} isLoading={isLoading} />
        <AvatarDialog
          open={openDialog}
          closeDialog={() => setOpenDialog(false)}
        />
      </Container>
    </Fragment>
  );
}
