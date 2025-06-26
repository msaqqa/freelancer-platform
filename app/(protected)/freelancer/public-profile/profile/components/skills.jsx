'use client';

import { useState } from 'react';
import { useUserStore } from '@/stores/user-store';
import { SquarePen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '@/components/common/empty-state';
import { SkillsDialog } from '../dialogs';

const Skills = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useUserStore();
  const skills = user?.skills || [];
  const { t } = useTranslation('freelancerProfile');
  const fp = (key) => t(`skills.${key}`);

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
        <CardTitle>Skills</CardTitle>
        {skills.length > 0 && (
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
        {skills.length ? (
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
      />
    </Card>
  );
};

export { Skills };
