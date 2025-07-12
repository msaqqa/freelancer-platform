'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Pencil, SquarePen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/common/empty-state';
import { SocialsDialog } from '../dialogs';

const Socials = ({ user, isLoading }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const socials = user?.socials || [];
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`socials.${key}`);

  const Loading = () => {
    return (
      <>
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="size-6 rounded-full m-0" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="size-6 rounded-full m-0" />
          <Skeleton className="h-3 w-18" />
        </div>
      </>
    );
  };

  const renderItems = (item, index) => {
    return (
      <div key={index} className="flex items-center gap-2.5">
        <div dangerouslySetInnerHTML={{ __html: item.icon }} />
        <Link
          href={item.link}
          className="text-sm leading-none text-mono hover:text-primary-active"
        >
          {item.name}
        </Link>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{fp('socialsTitle')}</CardTitle>
        {socials?.length > 0 && (
          <Button variant="ghost" onClick={() => setOpenDialog(true)}>
            <Pencil size={16} className="text-accent-foreground" /> {t('edit')}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loading />
        ) : socials?.length > 0 ? (
          <div className="grid gap-y-5">
            {socials.map((item, index) => {
              return renderItems(item, index);
            })}
          </div>
        ) : (
          <EmptyState
            title={fp('socialsTitle')}
            description={fp('socialsDesc')}
            icon={{
              light: '/media/icons/socials-light.svg',
              dark: '/media/icons/socials-dark.svg',
            }}
            openDialog={() => setOpenDialog(true)}
          />
        )}
      </CardContent>
      <SocialsDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
        socials={socials}
      />
    </Card>
  );
};

export { Socials };
