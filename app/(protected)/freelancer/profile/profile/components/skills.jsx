'use client';

import { useState } from 'react';
import { Pencil, SquarePen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/common/empty-state';
import { SkillsDialog } from '../dialogs';

const Skills = ({ user, isLoading }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const skills = user?.skills || [];
  const categoryId = user?.category?.id;
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`skills.${key}`);

  const Loading = () => {
    return (
      <div className="flex items-center flex-wrap space-x-4 space-y-2">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-18" />
      </div>
    );
  };

  const renderItem = (item) => {
    return (
      <Badge key={item.id} variant="secondary">
        {item.name}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{fp('skillsTitle')}</CardTitle>
        {skills.length > 0 && (
          <Button variant="ghost" onClick={() => setOpenDialog(true)}>
            <Pencil size={16} className="text-accent-foreground" /> {t('edit')}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loading />
        ) : skills.length ? (
          <div className="flex flex-wrap gap-2.5 mb-2">
            {skills.map((item) => {
              return renderItem(item);
            })}
          </div>
        ) : (
          <EmptyState
            title={fp('skillsTitle')}
            description={fp('skillsDesc')}
            icon={{
              light: '/media/icons/skills-light.svg',
              dark: '/media/icons/skills-dark.svg',
            }}
            openDialog={() => setOpenDialog(true)}
          />
        )}
      </CardContent>
      <SkillsDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
        skills={skills}
        categoryId={categoryId}
      />
    </Card>
  );
};

export { Skills };
