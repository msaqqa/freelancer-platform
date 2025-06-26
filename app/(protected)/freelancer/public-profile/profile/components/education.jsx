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
  const [educationId, setEducationId] = useState('');
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`education.${key}`);
  const { user } = useUserStore();
  const educations = user?.educations || [
    { id: 1, status: 'isalmic', info: 'info' },
  ];

  const renderTable = (item) => {
    return (
      <div key={item.id} className="flex flex-col gap-2.5 mb-5">
        <div className="flex justify-between items-center gap-2.5">
          <div className="text-sm text-mono">{item.status}</div>
          <Button
            variant="ghost"
            mode="icon"
            onClick={() => {
              setOpenDialog(true);
              setEducationId(item.id);
            }}
          >
            <SquarePen size={16} className="text-blue-500" />
          </Button>
        </div>
        <div className="text-sm text-secondary-foreground">
          <h4>{item.info}</h4>
          <h4>{item.info}</h4>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{fp('educationTitle')}</CardTitle>
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
        educationId={educationId}
      />
    </Card>
  );
};

export { Education };
