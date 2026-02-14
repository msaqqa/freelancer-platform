'use client';

import { Fragment, useState } from 'react';
import { UserHero } from '@/partials/common/user-hero';
import { Container } from '@/components/common/container';
import { PageTabs } from '@/app/(protected)/freelancer/profile/page-tabs';
import { AvatarDialog } from './profile/dialogs/avatar-dialog';

export default function ProfilePage() {
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
        <PageTabs />
        <AvatarDialog
          open={openDialog}
          closeDialog={() => setOpenDialog(false)}
          user={user}
        />
      </Container>
    </Fragment>
  );
}
