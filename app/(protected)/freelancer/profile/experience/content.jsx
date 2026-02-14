'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExperienceCard } from './components';

export function ExperienceContent() {
  const [openDialog, setOpenDialog] = useState(false);
  const items = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
      <div className="flex flex-wrap items-center gap-5 justify-between">
        <h3 className="text-lg text-mono font-semibold">
          {items.length > 0 ? items.length : null} Work Experience
        </h3>
        {items.length > 0 && (
          <div className="flex items-center space-x-2.5">
            <Button mode="link" onClick={() => setOpenDialog(true)}>
              <span className="p-px border border-primary rounded-md">
                <Plus size={16} />
              </span>
              Add Experience
            </Button>
          </div>
        )}
      </div>
      <Card>
        <CardContent>
          {items.length > 0 ? (
            items.map((item) => <ExperienceCard key={item.id} item={item} />)
          ) : (
            <Empty
              image="/media/icons/project-light.svg"
              title="Projects"
              decription="Once the freelancer adds portfolio items, they will appear here."
              openDialog={() => setOpenDialog(true)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
