'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { getFreelancerPortfolios } from '@/services/freelancer/portfolio';
import { CardWork } from '@/partials/cards';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/common/empty';
import { Spinner } from '@/components/ui/spinners';
import ProjectAddDialog from './dialogs/project-add-dialog';

const PortfolioContent = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['user-projects'],
    queryFn: getFreelancerPortfolios,
  });
  const items = data?.data ?? [];

  const renderItem = (item) => (
    <CardWork
      key={item.id}
      id={item.id}
      title={item.title}
      image={item.image}
      project={item}
    />
  );

  return (
    <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
      <div className="flex flex-wrap items-center gap-5 justify-between">
        <h3 className="text-lg text-mono font-semibold">
          {items.length > 0 ? items.length : null} Projects
        </h3>
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center">
            <Button mode="link" onClick={() => setOpenDialog(true)}>
              <span className="p-px border border-primary rounded-md">
                <Plus size={16} />
              </span>
              Add Project
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spinner className="size-6 animate-spin" />
        </div>
      ) : items.length > 0 ? (
        <div id="works_cards">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
            {items.map((item) => renderItem(item))}
          </div>
        </div>
      ) : (
        <Empty
          image="/media/icons/project-light.svg"
          title="Projects"
          decription="Once the freelancer adds portfolio items, they will appear here."
          openDialog={() => setOpenDialog(true)}
        />
      )}

      <ProjectAddDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </div>
  );
};

export { PortfolioContent };
