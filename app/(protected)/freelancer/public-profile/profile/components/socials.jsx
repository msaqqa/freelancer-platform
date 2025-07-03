'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUserStore } from '@/stores/user-store';
import { SquarePen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/common/empty-state';
import { SocialsDialog } from '../dialogs';

const Socials = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useUserStore();
  const socials = user.socials;
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`socials.${key}`);

  const renderItems = (item) => {
    return (
      <div key={item.id} className="flex items-center gap-2.5">
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
          <Button
            variant="ghost"
            mode="icon"
            onClick={() => setOpenDialog(true)}
          >
            <SquarePen size={16} className="text-blue-500" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {socials?.length ? (
          <div className="grid gap-y-5">
            {socials.map((item) => {
              return renderItems(item);
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
