'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/auth/use-auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { useSettings } from '@/providers/settings-provider';
import { Scrollspy } from '@/components/ui/scrollspy';
import { ClientPersonalDetails, FreelancerRequiredData } from './components';
import { RequiredDataSidebar } from './required-data-sidebar';

const stickySidebarClasses = {
  'demo1-layout': 'top-[calc(var(--header-height)+1rem)]',
  'demo2-layout': 'top-[calc(var(--header-height)+1rem)]',
  'demo3-layout': 'top-[calc(var(--header-height)+var(--navbar-height)+1rem)]',
  'demo4-layout': 'top-[3rem]',
  'demo5-layout': 'top-[calc(var(--header-height)+1.5rem)]',
  'demo6-layout': 'top-[3rem]',
  'demo7-layout': 'top-[calc(var(--header-height)+1rem)]',
  'demo8-layout': 'top-[3rem]',
  'demo9-layout': 'top-[calc(var(--header-height)+1rem)]',
  'demo10-layout': 'top-[1.5rem]',
};

export function AccountSettingsSidebarContent() {
  const { data: user } = useAuth();
  const isMobile = useIsMobile();
  const { settings } = useSettings();
  const [sidebarSticky, setSidebarSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('personal_details');

  // Initialize ref for parentEl
  const parentRef = useRef(document); // Default to document
  const scrollPosition = useScrollPosition({ targetRef: parentRef });

  // Effect to update parentRef after the component mounts
  useEffect(() => {
    const scrollableElement = document.getElementById('scrollable_content');
    if (scrollableElement) {
      parentRef.current = scrollableElement;
    }
  }, []); // Run only once on component mount

  // Handle scroll position and sidebar stickiness
  useEffect(() => {
    setSidebarSticky(scrollPosition > 100);
  }, [scrollPosition]);

  // Get the sticky class based on the current layout, provide a default if not found
  const stickyClass = settings?.layout
    ? stickySidebarClasses[settings?.layout] ||
      'top-[calc(var(--header-height)+1rem)]'
    : 'top-[calc(var(--header-height)+1rem)]';

  return (
    <div className="flex grow gap-5 lg:gap-7.5">
      {!isMobile && (
        <div className="w-[230px] shrink-0">
          <div
            className={cn(
              'w-[230px]',
              sidebarSticky && `fixed z-10 start-auto ${stickyClass}`,
            )}
          >
            <Scrollspy offset={100}>
              <RequiredDataSidebar
                accountType={user?.type}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
            </Scrollspy>
          </div>
        </div>
      )}
      <div className="flex flex-col items-stretch grow gap-5 lg:gap-7.5">
        {user?.type == 'freelancer' && (
          <FreelancerRequiredData
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        )}
        {user?.type == 'client' && <ClientPersonalDetails />}
      </div>
    </div>
  );
}
