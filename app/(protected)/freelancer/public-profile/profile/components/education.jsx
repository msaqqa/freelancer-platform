'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Pencil, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getFreelancerEducations } from '@/services/freelancer/profile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/common/empty-state';
import { EducationDialog } from '../dialogs';

const Education = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [educationId, setEducationId] = useState(null);
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`education.${key}`);

  // get getFreelancerEducations data from api
  const { data: educationsData, isLoading: educationLoading } = useQuery({
    queryKey: ['freelancer-educations'],
    queryFn: getFreelancerEducations,
  });
  const educations = educationsData?.data ?? [];

  const renderTable = (item) => {
    return (
      <div key={item.id} className="flex flex-col gap-1.5 mb-5">
        <div className="flex justify-between items-center gap-2.5">
          <div className="text-sm text-mono">{item.university}</div>
          <Button
            variant="ghost"
            onClick={() => {
              setEducationId(item.id);
              setOpenDialog(true);
            }}
          >
            <Pencil size={16} className="text-accent-foreground" /> {t('edit')}
          </Button>
        </div>
        <div className="flex flex-col gap-1 text-sm text-secondary-foreground">
          <div>{item.degree?.name}</div>
          <div>{item.field_of_study}</div>
          <div>
            {`${item.start_date?.split('-')[1]} - ${
              item.end_date ? item.end_date?.split('-')[1] : fp('present')
            }`}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{fp('educationTitle')}</CardTitle>
        {educations?.length > 0 && (
          <Button
            variant="ghost"
            onClick={() => {
              setOpenDialog(true);
              setEducationId(null);
            }}
          >
            <Plus size={16} className="text-accent-foreground" /> {t('add')}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {educations?.length ? (
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
        educationId={educationId}
      />
    </Card>
  );
};

export { Education };
