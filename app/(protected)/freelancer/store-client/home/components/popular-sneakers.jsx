'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card2 } from '@/app/(protected)/freelancer/store-client/components/common/card2';

export function PopularSneakers() {
  const items = [
    {
      logo: '11.png',
      title: 'Cloud Shift Lightweight Runner Pro Edition',
      total: '99.00',
      star: '5.0',
    },
    {
      logo: '12.png',
      title: 'Titan Edge High Impact Stability Lightweight Trainers',
      total: '65.99',
      star: '3.5',
    },
    {
      logo: '13.png',
      title: 'Wave Strike Dynamic Boost Sneaker',
      total: '120.00',
      star: '4.7',
    },
    {
      logo: '14.png',
      title: 'Velocity Boost Xtreme High  Shock Absorbers',
      total: '110.00',
      star: '4.9',
    },
  ];

  const renderItem = (item, index) => (
    <Card2
      logo={item.logo}
      star={item.star}
      title={item.title}
      total={item.total}
      key={index}
    />
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-lg font-medium text-mono">Popular Sneakers</span>

        <Button mode="link" asChild>
          <Link href="/account/home/get-started" className="text-xs">
            See All <ChevronRight />
          </Link>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-2">
        {items.map((item, index) => {
          return renderItem(item, index);
        })}
      </div>
    </div>
  );
}
