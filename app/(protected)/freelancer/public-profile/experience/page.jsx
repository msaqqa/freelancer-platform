'use client';

import { Fragment } from 'react';
import { UserHero } from '@/partials/common/user-hero';
import { DropdownMenu9 } from '@/partials/dropdown-menu/dropdown-menu-9';
import { Navbar, NavbarActions } from '@/partials/navbar/navbar';
import { EllipsisVertical, MessagesSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { ProfileActivityContent } from '@/app/(protected)/freelancer/public-profile/experience/content';
import { PageMenu } from '@/app/(protected)/freelancer/public-profile/page-menu';

export default function ProfileActivityPage() {
  return (
    <Fragment>
      <UserHero />
      <Container>
        <Navbar>
          <PageMenu />
          <NavbarActions>
            <Button>
              <Users /> Connect
            </Button>
            <Button variant="outline" mode="icon">
              <MessagesSquare size={16} />
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
        <div className="flex flex-wrap items-center gap-5 justify-between mb-7.5">
          <h3 className="text-lg text-mono font-semibold">Activity</h3>
        </div>
        <ProfileActivityContent />
      </Container>
    </Fragment>
  );
}
