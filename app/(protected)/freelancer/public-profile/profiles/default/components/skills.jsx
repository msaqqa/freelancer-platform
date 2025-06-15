'use client';

import { useState } from 'react';
import { SquarePen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SkillsDialog } from '../dialogs/skills-dialog';

const Skills = ({ title, className }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const items = [
    { label: 'Web Design' },
    { label: 'Code Review' },
    { label: 'Figma' },
    { label: 'Product Development' },
    { label: 'Webflow' },
    { label: 'AI' },
    { label: 'noCode' },
    { label: 'Management' },
  ];

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
        <Button variant="ghost" mode="icon" onClick={() => setOpenDialog(true)}>
          <SquarePen size={16} className="text-blue-500" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2.5 mb-2">
          {items.map((item, index) => {
            return renderItem(item, index);
          })}
        </div>
      </CardContent>
      <SkillsDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </Card>
  );
};

export { Skills };
