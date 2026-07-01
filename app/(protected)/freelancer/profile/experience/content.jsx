'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getFreelancerExperiences } from '@/services/freelancer/experience';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/common/empty';
import { ExperienceDialog } from './dialogs/experience-dialog';
import { ExperienceCard, ExperienceSkeleton } from './components';

export function ExperienceContent() {
  const [openDialog, setOpenDialog] = useState(false);
  const [experienceId, setExperienceId] = useState(undefined);
  const { t } = useTranslation('freelancerExperience');

  const { data, isLoading } = useQuery({
    queryKey: ['freelancer-experiences'],
    queryFn: getFreelancerExperiences,
  });
  const items = data?.data ?? [];

  const openAdd = () => {
    setExperienceId(undefined);
    setOpenDialog(true);
  };

  const openEdit = (id) => {
    setExperienceId(id);
    setOpenDialog(true);
  };

  return (
    <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
      <div className="flex flex-wrap items-center gap-5 justify-between">
        <h3 className="text-lg text-mono font-semibold">
          {items.length > 0 ? items.length : null} {t('content.title')}
        </h3>
        {items.length > 0 && (
          <Button mode="link" onClick={openAdd}>
            <span className="p-px border border-primary rounded-md">
              <Plus size={16} />
            </span>
            {t('content.addBtn')}
          </Button>
        )}
      </div>

      {isLoading ? (
        <ExperienceSkeleton />
      ) : items.length > 0 ? (
        <div className="flex flex-col gap-5 lg:gap-7.5">
          {items.map((item) => (
            <ExperienceCard
              key={item.id}
              item={item}
              onEdit={() => openEdit(item.id)}
            />
          ))}
        </div>
      ) : (
        <Empty
          image="/media/icons/project-light.svg"
          title={t('content.title')}
          decription={t('content.emptyDesc')}
          openDialog={openAdd}
        />
      )}

      <ExperienceDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
        experienceId={experienceId}
      />
    </div>
  );
}
