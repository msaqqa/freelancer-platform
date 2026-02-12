'use client';

import { Fragment } from 'react';
import { UserHero } from '@/partials/common/user-hero';
import { Navbar, NavbarActions } from '@/partials/navbar/navbar';
import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { PageMenu } from '@/app/(protected)/freelancer/page-menu';
import { Teams } from './components';

export default function ProfileTeamsPage() {
  return (
    <Fragment>
      <UserHero />
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
        <Teams />
      </Container>
    </Fragment>
  );
}
