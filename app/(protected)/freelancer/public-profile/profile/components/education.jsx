'use client';

import { useState } from 'react';
import { useUserStore } from '@/stores/user-store';
import { useQuery } from '@tanstack/react-query';
import { PlusSquare, SquarePen } from 'lucide-react';
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
      <div key={item.id} className="flex flex-col gap-2.5 mb-5">
        <div className="flex justify-between items-center gap-2.5">
          <div className="text-sm text-mono">{item.university}</div>
          <Button
            variant="ghost"
            mode="icon"
            onClick={() => {
              setEducationId(item.id);
              setOpenDialog(true);
            }}
          >
            <SquarePen size={16} className="text-blue-500" />
          </Button>
        </div>
        <div className="flex flex-col gap-1.5 text-sm text-secondary-foreground">
          <div>{item.field_of_study}</div>
          <div>{item.degree.anme}</div>
          <div>
            {item.start_date} - {item.end_date}
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
            mode="icon"
            onClick={() => {
              setOpenDialog(true);
              setEducationId(null);
            }}
          >
            <PlusSquare size={16} className="text-blue-500" />
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
