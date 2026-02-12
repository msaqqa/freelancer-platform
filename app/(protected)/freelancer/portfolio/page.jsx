'use client';

import { Fragment } from 'react';
import { UserHero } from '@/partials/common/user-hero';
import { Navbar, NavbarActions } from '@/partials/navbar/navbar';
import { Share } from 'lucide-react';
import { useAuth } from '@/hooks/auth/use-auth';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { PageMenu } from '@/app/(protected)/freelancer/page-menu';
import { PortfolioContent } from './components';

export default function ProfileWorksPage() {
  // const { data: user, isLoading } = useAuth();

  return (
    <Fragment>
      <UserHero user={{}} isLoading={false} />
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
        <PortfolioContent />
      </Container>
    </Fragment>
  );
}
