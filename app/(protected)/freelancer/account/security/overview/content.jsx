'use client';

import { Fragment } from 'react';
import { HighlightedPosts } from '@/partials/common/highlighted-posts';
import { ShieldCheck, ShieldOff, ShieldQuestion } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import {
  Authentification,
  GeneralSettings,
  LoginSessions,
  ProductInsight,
  QuickSettings,
  TrustedDevices,
} from './components';

export function AccountOverviewContent() {
  const posts = [
    {
      icon: ShieldOff,
      title: 'Enhancing Security Knowledge: Guides, Tips, and Documentation',
      summary:
        'Explore comprehensive resources to strengthen security understanding through detailed guides, expert tips, and documentation.',
      path: '#',
    },
    {
      icon: ShieldCheck,
      title: 'Mastering Security Protocols: Learning Through Expert Guidance',
      summary:
        'Delve into the realm of security with specialized learning materials, expert guidance, and practical tips for implementation.',
      path: '#',
    },
    {
      icon: ShieldQuestion,
      title: 'Navigating Digital Security: A Comprehensive Learning Journey',
      summary:
        'Embark on a journey of digital security enlightenment with our extensive collection of educational guides and practical advice..',
      path: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <GeneralSettings />
          <Authentification />
          <QuickSettings />
          <LoginSessions />
          <TrustedDevices />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <ProductInsight
            image={
              <Fragment>
                <img
                  src={toAbsoluteUrl('/media/brand-logos/apple-black.svg')}
                  className="dark:hidden h-5"
                  alt="image"
                />

                <img
                  src={toAbsoluteUrl('/media/brand-logos/apple-white.svg')}
                  className="light:hidden h-5"
                  alt="image"
                />
              </Fragment>
            }
            title="iOS"
            description="Active Sessions"
            number={24}
          />

          <ProductInsight
            image={
              <img
                src={toAbsoluteUrl('/media/brand-logos/android.svg')}
                className="h-5"
                alt="image"
              />
            }
            title="Android"
            description="Active Sessions"
            number={35}
          />

          <HighlightedPosts posts={posts} />
        </div>
      </div>
    </div>
  );
}
