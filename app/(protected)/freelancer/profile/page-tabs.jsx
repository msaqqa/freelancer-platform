'use client';

import { Share } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NavbarActions } from '@/app/components/partials/navbar/navbar';
import { ExperienceContent } from './experience/content';
import { PortfolioContent } from './portfolio/content';
import { ProfileContent } from './profile/content';
import { ServicesContent } from './services/content';
import { WorkHistoryContent } from './work-history/content';

const PageTabs = ({ user, isLoading }) => {
  const { t } = useTranslation('freelancerCommon');

  return (
    <Tabs defaultValue="1" className="w-full">
      <TabsList
        className="flex flex-col md:flex-row  items-center flex-wrap md:flex-nowrap lg:items-end justify-between border-b border-border gap-3 lg:gap-6 mb-5 lg:mb-10"
        variant="line"
      >
        <div className="flex items-center gap-5">
          <TabsTrigger value="1">{t('tabs.profile')}</TabsTrigger>
          <TabsTrigger value="2">{t('tabs.portfolio')}</TabsTrigger>
          <TabsTrigger value="3">{t('tabs.services')}</TabsTrigger>
          <TabsTrigger value="4">{t('tabs.experience')}</TabsTrigger>
          <TabsTrigger value="5">{t('tabs.workHistory')}</TabsTrigger>
        </div>
        <NavbarActions>
          <Button className="mb-3 md:mb-0">
            <Share /> {t('shareBtn')}
          </Button>
        </NavbarActions>
      </TabsList>

      <TabsContent value="1">
        <ProfileContent user={user} isLoading={isLoading} />
      </TabsContent>
      <TabsContent value="2">
        <PortfolioContent />
      </TabsContent>
      <TabsContent value="3">
        <ServicesContent />
      </TabsContent>
      <TabsContent value="4">
        <ExperienceContent />
      </TabsContent>
      <TabsContent value="5">
        <WorkHistoryContent />
      </TabsContent>
    </Tabs>
  );
};

export { PageTabs };
