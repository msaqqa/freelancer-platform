'use client';

import { useState } from 'react';
import { CardTeam } from '@/partials/cards';
import {
  Brain,
  Ghost,
  LineChart,
  MessageSquareCode,
  Plus,
  ShieldOff,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/common/empty';

const WorkHistoryContent = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const items = [
    {
      icon: Ghost,
      title: 'Pixel Crafters',
      description: 'Crafting digital experiences for the world',
      labels: ['Ul', 'DevOps'],
      team: {
        size: 'size-7',
        group: [
          { filename: '300-4.png' },
          { filename: '300-1.png' },
          { filename: '300-2.png' },
        ],

        more: {
          number: 10,
          variant: 'text-white ring-background bg-green-500',
        },
      },
      connected: true,
      rating: { value: 5, round: 0 },
    },
    {
      icon: Sparkles,
      title: 'Code Masters',
      description: 'Coding the future, one line at a time',
      labels: ['Dev', 'Al', 'Cloud'],
      team: {
        size: 'size-7',
        group: [
          { filename: '300-5.png' },
          { filename: '300-7.png' },
          { filename: '300-11.png' },
        ],
      },
      connected: true,
      rating: { value: 5, round: 0 },
    },
    {
      icon: Brain,
      title: 'Market Mavericks',
      description: 'Navigating markets with strategic solutions',
      labels: ['Marketing', 'Brand'],
      team: {
        size: 'size-7',
        group: [
          { filename: '300-4.png' },
          { filename: '300-1.png' },
          { filename: '300-2.png' },
          {
            fallback: 'S',
            variant: 'text-primary-foreground ring-background bg-primary',
          },
        ],
      },
      connected: false,
      rating: { value: 4, round: 0.5 },
    },
  ];

  const renderItem = (item, index) => {
    return (
      <CardTeam
        icon={item.icon}
        title={item.title}
        description={item.description}
        labels={item.labels}
        team={item.team}
        connected={item.connected}
        rating={item.rating}
        key={index}
      />
    );
  };

  return (
    <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
      <div className="flex flex-wrap items-center gap-5 justify-between">
        <h3 className="text-lg text-foreground font-semibold">
          {items.length > 0 ? items.length : null} Work History
        </h3>
        {items.length > 0 && (
          <div className="flex items-center space-x-2.5">
            <Button mode="link" onClick={() => setOpenDialog(true)}>
              <span className="p-px border border-primary rounded-md">
                <Plus size={16} />
              </span>
              Add Work History
            </Button>
          </div>
        )}
      </div>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
          {items.map((item, index) => {
            return renderItem(item, index);
          })}
        </div>
      ) : (
        <Empty
          image="/media/icons/project-light.svg"
          title="Service"
          decription="Add a service to show clients what you offer, how you can help, and make booking you easy."
          openDialog={() => setOpenDialog(true)}
        />
      )}
    </div>
  );
};

export { WorkHistoryContent };
