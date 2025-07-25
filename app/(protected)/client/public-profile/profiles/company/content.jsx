'use client';

import {
  RiFacebookCircleLine,
  RiTwitterXLine,
  RiYoutubeLine,
} from '@remixicon/react';
import { Dribbble, Mail } from 'lucide-react';
import { Connections } from '@/app/(protected)/client/public-profile/profiles/default/components/connections';
import { Contributions } from '@/app/(protected)/client/public-profile/profiles/default/components/contributions';
import { Projects } from '@/app/(protected)/client/public-profile/profiles/default/components/projects';
import { Tags } from '@/app/(protected)/client/public-profile/profiles/default/components/tags';
import {
  CompanyProfile,
  Highlights,
  Locations,
  Network,
  OpenJobs,
  Statistics,
} from './components';

export function ProfileCompanyContent() {
  const items = [
    { number: '624', label: 'Employees' },
    { number: '60.7M', label: 'Users' },
    { number: '369M', label: 'Revenue' },
    { number: '27', label: 'Company Rank' },
  ];

  const data = [
    { icon: Dribbble, link: 'https://duolingo.com' },
    { icon: Mail, link: 'info@duolingo.com' },
    { icon: RiFacebookCircleLine, link: 'duolingo' },
    { icon: RiTwitterXLine, link: 'duolingo-news' },
    { icon: RiYoutubeLine, link: 'duolingo-tuts' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-1 lg:col-span-3">
        <Statistics items={items} />
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <Highlights />
          <OpenJobs />
          <Network title="Network" data={data} />
          <Tags title="Tags" />
        </div>
      </div>
      <div className="col-span-1 lg:col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <CompanyProfile />
          <Locations />
          <Projects />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
            <Connections title="Members" />
            <Contributions title="Investments" />
          </div>
        </div>
      </div>
    </div>
  );
}
