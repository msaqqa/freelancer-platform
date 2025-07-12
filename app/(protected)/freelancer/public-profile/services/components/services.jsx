'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CardService } from '@/partials/cards';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { getFreelancerServices } from '@/services/freelancer/services';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/common/empty';
import ServiceAddDialog from '../dialogs/service-add-dialog';

const Services = () => {
  const [openDialog, setOpenDialog] = useState(false);
  // get freelancer services from api
  const { data: servicesData, isLoading: servicesLoading } = useQuery({
    queryKey: ['freelancer-services'],
    queryFn: getFreelancerServices,
  });
  const services = servicesData?.data ?? [];

  const items = [
    {
      title: 'Urban Dreams',
      description: 'Cloud storage and file sharing',
      image: '21.jpg',
      authorName: 'Cody Fisher',
      authorAvatar: '300-6.png',
      likes: 24,
      comments: 5,
    },
    {
      title: 'Whispered Emotions',
      description: 'Neutrals are the epitome of timeless elegance',
      image: '3.jpg',
      authorName: 'Wade Warren',
      authorAvatar: '300-14.png',
      likes: 187,
      comments: 49,
    },
    {
      title: 'Golden Serenity',
      description: 'Choose the right time. ',
      image: '22.jpg',
      authorName: 'Albert Flores',
      authorAvatar: '300-11.png',
      likes: 60,
      comments: 13,
    },
    {
      title: 'Mystic Shadows',
      description: 'Her alluring appearance radiates calmness.',
      image: '23.jpg',
      authorName: 'Kathryn Murphy',
      authorAvatar: '300-1.png',
      likes: 37,
      comments: 16,
    },
    {
      title: 'Wild Beauty',
      description: 'Pulled apart by reality',
      image: '14.jpg',
      authorName: 'Devon Lane',
      authorAvatar: '300-16.png',
      likes: 625,
      comments: 109,
    },
    {
      title: 'Timeless Elegance',
      description: 'The charm and limit of shadows',
      image: '25.jpg',
      authorName: 'Jenny Wilson',
      authorAvatar: '300-5.png',
      likes: 6,
      comments: 1,
    },
    {
      title: 'Intrepid Travel',
      description: 'Understand the world with us',
      image: '26.jpg',
      authorName: 'Jhon Smith',
      authorAvatar: '300-25.png',
      likes: 30,
      comments: 22,
    },
    {
      title: 'We rise together',
      description: 'We share the best experiences with you',
      image: '2.jpg',
      authorName: 'Adam Cruse',
      authorAvatar: '300-29.png',
      likes: 19,
      comments: 23,
    },
  ];

  const renderItem = (item, index) => {
    return (
      <CardService
        title={item.title}
        image={item.image}
        authorName={item.authorName}
        authorAvatar={item.authorAvatar}
        likes={item.likes}
        comments={item.comments}
        key={index}
      />
    );
  };

  return (
    <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
      <div className="flex flex-wrap items-center gap-5 justify-between">
        <h3 className="text-lg text-mono font-semibold">
          {items.length > 0 && items.length} Service
        </h3>
        {items.length > 0 && (
          <div className="flex items-center space-x-2.5">
            <Button mode="link" onClick={() => setOpenDialog(true)}>
              <span className="p-px border border-primary rounded-md">
                <Plus size={16} />
              </span>
              Add Service
            </Button>
          </div>
        )}
      </div>
      {items.length > 0 ? (
        <div id="works_cards">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
            {items.map((item, index) => {
              return renderItem(item, index);
            })}
          </div>
          <div className="flex grow justify-center pt-5 lg:pt-7.5">
            <Button mode="link" underlined="dashed" asChild>
              <Link href="#">Show more Services</Link>
            </Button>
          </div>
        </div>
      ) : (
        <Empty
          image="/media/icons/services-light.svg"
          title="Service"
          decription="Add a service to show clients what you offer, how you can help, and make booking you easy."
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

export { Services };
