'use client';

import { useState } from 'react';
import { SquarePen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SkillsDialog } from '../dialogs/skills-dialog';
import { EmptyState } from './empty-state';

const Skills = ({ title, className }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const items = [];

  const renderItem = (item, index) => {
    return (
      <Badge key={index} variant="secondary">
        {item.label}
      </Badge>
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {items.length > 0 && (
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
        {items.length ? (
          <div className="flex flex-wrap gap-2.5 mb-2">
            {items.map((item, index) => {
              return renderItem(item, index);
            })}
          </div>
        ) : (
          <EmptyState
            title="Skills"
            description="Add key skills that reflect your strengths and expertise."
            icon="/media/icons/skills-icon.svg"
            openDialog={() => setOpenDialog(true)}
          />
        )}
      </CardContent>
      <SkillsDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </Card>
  );
};

export { Skills };
