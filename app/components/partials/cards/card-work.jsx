'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EllipsisVertical } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProjectAddDialog from '@/app/(protected)/freelancer/profile/portfolio/dialogs/project-add-dialog';
import ProjectDeleteDialog from '@/app/(protected)/freelancer/profile/portfolio/dialogs/project-delete-dialog';
import ProjectViewDialog from '@/app/(protected)/freelancer/profile/portfolio/dialogs/project-view-dialog';
import { DropdownMenu8 } from '../dropdown-menu/dropdown-menu-8';

const CardWork = ({ id, image, title, project }) => {
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // `image` may be a full URL (Supabase public URL) or a legacy filename.
  const imageSrc =
    typeof image === 'string' && /^(https?:|\/)/.test(image)
      ? image
      : toAbsoluteUrl(`/media/images/600x400/${image || '8.jpg'}`);

  return (
    <Card className="border-0 shadow-sm shadow-black/8">
      <div className="relative">
        <img src={imageSrc} className="w-full h-auto rounded-t-xl" alt="image" />
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
        project={project}
      />
      <ProjectAddDialog
        open={openEditDialog}
        closeDialog={() => setOpenEditDialog(false)}
        portfolioId={id}
      />
      <ProjectDeleteDialog
        open={openDeleteDialog}
        closeDialog={() => setOpenDeleteDialog(false)}
        project={{ id }}
      />
    </Card>
  );
};

export { CardWork };
