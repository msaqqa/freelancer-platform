'use client';

import {
  About,
  CommunityBadges,
  Education,
  Languages,
  Skills,
  Socials,
  Summary,
  VerifyBadge,
  VerifyIdentity,
} from './components';

export function ProfileDefaultContent({ user, isLoading }) {
  const status = user?.id_verified?.status;
  console.log('status', status);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">
          <About user={user} isLoading={isLoading} />
          <Skills user={user} isLoading={isLoading} />
          <Languages user={user} isLoading={isLoading} />
          <CommunityBadges user={user} isLoading={isLoading} />
          <Education />
          <Socials user={user} isLoading={isLoading} />
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            {status !== 2 && <VerifyIdentity user={user} />}
            <VerifyBadge />
            <Summary />
          </div>
        </div>
      </div>
    </div>
  );
}
