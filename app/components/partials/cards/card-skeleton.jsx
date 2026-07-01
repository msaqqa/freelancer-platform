'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Loading placeholder for the portfolio / services card grids. Mirrors the
// CardWork / CardService layout (cover image + title + skill badges).
function CardsGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="w-full h-[180px] rounded-none" />
          <div className="flex flex-col gap-2.5 px-5 py-4.5">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
            <div className="flex flex-wrap gap-1.5 pt-1">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-10 rounded-full" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export { CardsGridSkeleton };
