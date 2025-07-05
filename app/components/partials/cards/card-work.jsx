'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EllipsisVertical } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProjectAddDialog from '@/app/(protected)/freelancer/public-profile/portfolio/dialogs/project-add-dialog';
import ProjectDeleteDialog from '@/app/(protected)/freelancer/public-profile/portfolio/dialogs/project-delete-dialog';
import ProjectViewDialog from '@/app/(protected)/freelancer/public-profile/portfolio/dialogs/project-view-dialog';
import { DropdownMenu8 } from '../dropdown-menu/dropdown-menu-8';

const CardWork = ({ image, title }) => {
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const project = {
    title: 'E-commerce Landing Page - Cartique',
    fields: [
      { type: 'image', value: '/media/images/600x400/3.jpg' },
      { type: 'text', value: 'Available for the new project' },
      { type: 'image', value: '/media/images/600x400/25.jpg' },
      { type: 'text', value: 'Available for the new project' },
    ],
    details: 'Posted Jun 10, 2025',
    tags: [
      { label: 'Web Design' },
      { label: 'Code Review' },
      { label: 'Figma' },
      { label: 'Product Development' },
      { label: 'Webflow' },
      { label: 'AI' },
      { label: 'noCode' },
      { label: 'Management' },
    ],
  };
  return (
    <Card className="border-0 shadow-sm shadow-black/8">
      <div className="relative">
        <img
          src={toAbsoluteUrl(`/media/images/600x400/${image}`)}
          className="w-full h-auto rounded-t-xl"
          alt="image"
        />
        <div className="absolute top-2 end-2">
          <DropdownMenu8
            trigger={
              <Button variant="outline" mode="icon" className="rounded-full">
                <EllipsisVertical />
              </Button>
            }
            handleView={() => setOpenViewDialog(true)}
            handleEdit={() => setOpenEditDialog(true)}
            handleDlete={() => setOpenDeleteDialog(true)}
          />
        </div>
      </div>

      <div className="card-border card-rounded-b flex flex-col gap-2 px-5 py-4.5">
        <Link
          href="/public-profile/profiles/company"
          className="text-lg font-medium text-mono hover:text-primary"
        >
          {title}
        </Link>
      </div>
      <ProjectViewDialog
        open={openViewDialog}
        closeDialog={() => setOpenViewDialog(false)}
      />
      <ProjectAddDialog
        open={openEditDialog}
        closeDialog={() => setOpenEditDialog(false)}
        project={project}
      />
      <ProjectDeleteDialog
        open={openDeleteDialog}
        closeDialog={() => setOpenDeleteDialog(false)}
      />
    </Card>
  );
};

export { CardWork };
