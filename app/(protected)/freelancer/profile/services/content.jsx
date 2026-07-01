'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getFreelancerServices } from '@/services/freelancer/services';
import { CardService } from '@/partials/cards';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/common/empty';
import { Spinner } from '@/components/ui/spinners';
import ServiceAddDialog from './dialogs/service-add-dialog';

const ServicesContent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation('services');

  const { data, isLoading } = useQuery({
    queryKey: ['freelancer-services'],
    queryFn: getFreelancerServices,
  });
  const items = data?.data ?? [];

  const renderItem = (item) => (
    <CardService
      key={item.id}
      id={item.id}
      title={item.title}
      image={item.image}
      service={item}
    />
  );

  return (
    <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
      <div className="flex flex-wrap items-center gap-5 justify-between">
        <h3 className="text-lg text-mono font-semibold">
          {items.length > 0 ? items.length : null} {t('content.services')}
        </h3>
        <div className="flex items-center space-x-2.5">
          <Button mode="link" onClick={() => setOpenDialog(true)}>
            <span className="p-px border border-primary rounded-md">
              <Plus size={16} />
            </span>
            {t('content.addService')}
          </Button>
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
          image="/media/icons/services-light.svg"
          title={t('content.emptyTitle')}
          decription={t('content.emptyDesc')}
          openDialog={() => setOpenDialog(true)}
        />
      )}

      <ServiceAddDialog
        open={openDialog}
        closeDialog={() => setOpenDialog(false)}
      />
    </div>
  );
};

export { ServicesContent };
