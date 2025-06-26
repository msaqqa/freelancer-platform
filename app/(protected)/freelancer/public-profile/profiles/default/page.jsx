'use client';

import { Fragment } from 'react';
import { UserHero } from '@/partials/common/user-hero';
import { DropdownMenu9 } from '@/partials/dropdown-menu/dropdown-menu-9';
import { Navbar, NavbarActions } from '@/partials/navbar/navbar';
import {
  EllipsisVertical,
  Luggage,
  Mail,
  MapPin,
  MessageSquareText,
  Users,
} from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { PageMenu } from '@/app/(protected)/freelancer/public-profile/page-menu';
import { ProfileDefaultContent } from '@/app/(protected)/freelancer/public-profile/profiles/default/content';

export default function ProfileDefaultPage() {
  const image = (
    <img
      src={toAbsoluteUrl('/media/avatars/300-1.png')}
      className="rounded-full border-3 border-green-500 size-[100px] shrink-0"
      alt="image"
    />
  );

  return (
    <Fragment>
      <UserHero
        name="Jenny Klabber"
        image={image}
        info={[
          { label: 'Full Stack Developer', icon: Luggage },
          { label: 'Palestine', icon: MapPin },
          { label: '5 Years Of Experience', icon: Mail },
        ]}
      />

      <Container>
        <Navbar>
          <PageMenu />
          <NavbarActions>
            <Button>
              <Users /> Connect
            </Button>
            <Button variant="outline" mode="icon">
              <MessageSquareText />
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
        <ProfileDefaultContent />
      </Container>
    </Fragment>
  );
}
