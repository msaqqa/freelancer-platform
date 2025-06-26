'use client';

import { useState } from 'react';
import { useUserStore } from '@/stores/user-store';
import { SquarePen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/common/empty-state';
import { EducationDialog } from '../dialogs';

const Education = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`education.${key}`);
  const { user } = useUserStore();
  const educations = user?.educations || [];

  const renderTable = (item) => {
    return (
      <div key={item.id} className="flex flex-col gap-2.5 mb-5">
        <div className="text-sm text-mono">{item.status}</div>
        <div className="text-sm text-secondary-foreground">
          <span>{item.info}</span>
          <span>{item.info}</span>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{fp('educationTitle')}</CardTitle>
        {educations.length > 0 && (
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
        {educations.length ? (
          educations.map((item) => {
            return renderTable(item);
          })
        ) : (
          <EmptyState
            title={fp('educationTitle')}
            description={fp('educationDesc')}
            icon={{
              light: '/media/icons/education-light.svg',
              dark: '/media/icons/education-dark.svg',
            }}
            openDialog={() => setOpenDialog(true)}
          />
        )}
      </CardContent>
      <EducationDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
        educations={educations}
      />
    </Card>
  );
};

export { Education };
