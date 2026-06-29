'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, EllipsisVertical } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ServiceAddDialog from '@/app/(protected)/freelancer/profile/services/dialogs/service-add-dialog';
import ServiceDeleteDialog from '@/app/(protected)/freelancer/profile/services/dialogs/service-delete-dialog';
import ServiceViewDialog from '@/app/(protected)/freelancer/profile/services/dialogs/service-view-dialog';
import { DropdownMenu8 } from '../dropdown-menu/dropdown-menu-8';

// Strip rich-text HTML down to a plain-text preview.
const toPlainText = (html) =>
  (html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const CardService = ({ id, image, title, service }) => {
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // `image` may be a full URL (Supabase) or a legacy filename.
  const imageSrc =
    typeof image === 'string' && /^(https?:|\/)/.test(image)
      ? image
      : toAbsoluteUrl(`/media/images/600x400/${image || '8.jpg'}`);

  const description = toPlainText(service?.description);
  const price = service?.price;
  const deliveryDays = service?.delivery_days;
  const skills = service?.skills ?? [];
  const visibleSkills = skills.slice(0, 3);
  const extraSkills = skills.length - visibleSkills.length;

  return (
    <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={imageSrc}
          className="w-full h-48 object-cover rounded-t-xl"
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

      <div className="card-border card-rounded-b flex flex-col gap-3 px-5 py-4.5">
        <Link
          href="/public-profile/profiles/company"
          className="text-lg font-medium text-mono hover:text-primary line-clamp-1"
        >
          {title}
        </Link>

        {description && (
          <p className="text-sm text-secondary-foreground leading-5.5 line-clamp-2">
            {description}
          </p>
        )}

        {(price != null && price !== '') ||
        (deliveryDays != null && deliveryDays !== '') ? (
          <div className="flex items-center gap-4 text-sm">
            {price != null && price !== '' && (
              <span className="font-semibold text-mono">
                <span className="font-normal text-secondary-foreground">
                  Starts at{' '}
                </span>
                ${price}
              </span>
            )}
            {deliveryDays != null && deliveryDays !== '' && (
              <span className="flex items-center gap-1.5 text-secondary-foreground">
                <Clock size={15} />
                {deliveryDays} day{Number(deliveryDays) === 1 ? '' : 's'}
              </span>
            )}
          </div>
        ) : null}

        {skills.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {visibleSkills.map((skill) => (
              <Badge key={skill.id} variant="secondary" size="sm">
                {skill.name}
              </Badge>
            ))}
            {extraSkills > 0 && (
              <Badge variant="outline" size="sm">
                +{extraSkills}
              </Badge>
            )}
          </div>
        )}
      </div>
      <ServiceViewDialog
        open={openViewDialog}
        closeDialog={() => setOpenViewDialog(false)}
        service={service}
      />
      <ServiceAddDialog
        open={openEditDialog}
        closeDialog={() => setOpenEditDialog(false)}
        serviceId={id}
      />
      <ServiceDeleteDialog
        open={openDeleteDialog}
        closeDialog={() => setOpenDeleteDialog(false)}
        service={{ id }}
      />
    </Card>
  );
};

export { CardService };
