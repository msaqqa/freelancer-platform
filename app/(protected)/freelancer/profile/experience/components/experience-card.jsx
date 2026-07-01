'use client';

import { Fragment, useState } from 'react';
import { Briefcase, EllipsisVertical } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { DropdownMenu8 } from '@/partials/dropdown-menu/dropdown-menu-8';
import { TimelineItem } from '@/partials/activities/timeline-item';
import { ExperienceDialog } from '../dialogs/experience-dialog';
import ExperienceDeleteDialog from '../dialogs/experience-delete-dialog';
import ExperienceViewDialog from '../dialogs/experience-view-dialog';

// "MM-YYYY" -> "MM/YYYY" (locale-neutral).
const fmt = (date) => (date ? date.replace('-', '/') : '');

const ExperienceCard = ({ item, isLast }) => {
  const { t } = useTranslation('freelancerExperience');
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const parts = [
    item.company,
    item.location,
    item.type && t(`types.${item.type}`),
  ].filter(Boolean);

  const range = `${fmt(item.start_date)} - ${
    item.end_date ? fmt(item.end_date) : t('present')
  }`;

  return (
    <TimelineItem icon={Briefcase} line={!isLast}>
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex flex-col">
          <div className="text-sm font-medium text-mono">{item.title}</div>

          {parts.length > 0 && (
            <div className="flex items-center flex-wrap gap-[10px] text-sm text-secondary-foreground mt-1">
              {parts.map((part, index) => (
                <Fragment key={index}>
                  {index > 0 && (
                    <span className="w-px h-[14px] bg-input" />
                  )}
                  <span>{part}</span>
                </Fragment>
              ))}
            </div>
          )}

          <div className="text-xs text-secondary-foreground mt-1.5">{range}</div>

          {item.description && (
            <div className="text-sm text-foreground mt-1.5">
              {item.description}
            </div>
          )}
        </div>

        <DropdownMenu8
          trigger={
            <Button
              variant="ghost"
              mode="icon"
              className="shrink-0 -mt-1 rounded-full"
            >
              <EllipsisVertical />
            </Button>
          }
          handleView={() => setOpenViewDialog(true)}
          handleEdit={() => setOpenEditDialog(true)}
          handleDlete={() => setOpenDeleteDialog(true)}
        />
      </div>

      <ExperienceViewDialog
        open={openViewDialog}
        closeDialog={() => setOpenViewDialog(false)}
        experience={item}
      />
      <ExperienceDialog
        open={openEditDialog}
        closeDialog={() => setOpenEditDialog(false)}
        experienceId={item.id}
      />
      <ExperienceDeleteDialog
        open={openDeleteDialog}
        closeDialog={() => setOpenDeleteDialog(false)}
        experienceId={item.id}
      />
    </TimelineItem>
  );
};

export { ExperienceCard };
