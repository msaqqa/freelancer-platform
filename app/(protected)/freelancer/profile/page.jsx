'use client';

import { Fragment, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFreelancerProfile } from '@/services/freelancer/profile';
import { UserHero } from '@/partials/common/user-hero';
import { Container } from '@/components/common/container';
import { PageTabs } from '@/app/(protected)/freelancer/profile/page-tabs';
import { AvatarDialog } from './profile/dialogs/avatar-dialog';

export default function ProfilePage() {
  const [openDialog, setOpenDialog] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ['freelancer-profile'],
    queryFn: getFreelancerProfile,
    staleTime: 1000 * 60,
  });
  const user = data?.data ?? {};
  return (
    <Fragment>
      <UserHero
        user={user}
        isLoading={isLoading}
        openDialog={() => setOpenDialog(true)}
      />
      <Container>
        <PageTabs user={user} isLoading={isLoading} />
        <AvatarDialog
          open={openDialog}
          closeDialog={() => setOpenDialog(false)}
          user={user}
        />
      </Container>
    </Fragment>
  );
}
