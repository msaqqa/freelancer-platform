'use client';

import {
  About,
  CommunityBadges,
  Languages,
  PostVedio,
  Skills,
  Socials,
  Summary,
  VerifyBadge,
  VerifyIdentity,
} from './components';

export function ProfileDefaultContent() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">
          <About />
          <Skills title="Skills" />
          <Languages />
          <CommunityBadges title="Community Badges" />
          <Socials />
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <VerifyIdentity />
            <VerifyBadge />
            <Summary />
            <PostVedio />
          </div>
        </div>
      </div>
    </div>
  );
}
