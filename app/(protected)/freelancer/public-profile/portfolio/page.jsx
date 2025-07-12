'use client';

import { Fragment } from 'react';
import { UserHero } from '@/partials/common/user-hero';
import { DropdownMenu9 } from '@/partials/dropdown-menu/dropdown-menu-9';
import { Navbar, NavbarActions } from '@/partials/navbar/navbar';
import { EllipsisVertical, Users } from 'lucide-react';
import { useAuth } from '@/hooks/auth/use-auth';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { PageMenu } from '@/app/(protected)/freelancer/public-profile/page-menu';
import { PortfolioContent } from './components';

export default function ProfileWorksPage() {
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
        <PortfolioContent />
      </Container>
    </Fragment>
  );
}
