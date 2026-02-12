'use client';

import { Briefcase } from 'lucide-react';
import { TimelineItem } from './timeline-item';

const ActivitiesDesignerWelcome = () => {
  return (
    <TimelineItem icon={Briefcase} line={true}>
      <div className="flex flex-col">
        <div className="flex items-center gap-[16px] flex-wrap text-[14px] font-medium leading-[28px] text-black-300 dark:text-black-50 mb-[7px]">
          <p>Taqat</p>
          <div className="w-[1px] h-[17px] bg-[#D9D9D9]"></div>
          <p>Gaza</p>
          <div className="w-[1px] h-[17px] bg-[#D9D9D9]"></div>
          <p>On-site</p>
        </div>
        <div className="text-xs text-secondary-foreground mb-[7px]">
          2 weeks ago, 10:45 AM
        </div>
        <div className="text-sm text-foreground">
          Onboarded a talented designer to our creative team, adding valuable
          expertise to upcoming projects.
        </div>
      </div>
    </TimelineItem>
  );
};

export { ActivitiesDesignerWelcome };
