'use client';

import { Fragment } from 'react';
import { UserHero } from '@/partials/common/user-hero';
import { Navbar, NavbarActions } from '@/partials/navbar/navbar';
import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { ProfileActivityContent } from '@/app/(protected)/freelancer/experience/content';
import { PageMenu } from '@/app/(protected)/freelancer/page-menu';

export default function ProfileActivityPage() {
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
        <div className="flex flex-wrap items-center gap-5 justify-between mb-7.5">
          <h3 className="text-lg text-mono font-semibold">Work Experience</h3>
        </div>
        <ProfileActivityContent />
      </Container>
    </Fragment>
  );
}
