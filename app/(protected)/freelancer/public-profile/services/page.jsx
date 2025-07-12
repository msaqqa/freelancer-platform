'use client';

import { Fragment } from 'react';
import { UserHero } from '@/partials/common/user-hero';
import { Navbar } from '@/partials/navbar/navbar';
import { useAuth } from '@/hooks/auth/use-auth';
import { Container } from '@/components/common/container';
import { PageMenu } from '@/app/(protected)/freelancer/public-profile/page-menu';
import { Services } from './components';

export default function ProfileServicesPage() {
  const { data: user, isLoading } = useAuth();

  return (
    <Fragment>
      <UserHero user={user} isLoading={isLoading} />
      <Container>
        <Navbar>
          <PageMenu />
        </Navbar>
      </Container>
      <Container>
        <Services />
      </Container>
    </Fragment>
  );
}
