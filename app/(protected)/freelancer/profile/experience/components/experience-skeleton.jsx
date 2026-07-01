'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Loading placeholder for the experience timeline. Mirrors the ExperienceCard
// (TimelineItem) layout: circular icon + stacked text rows inside one card.
function ExperienceSkeleton({ count = 3 }) {
  return (
    <Card>
      <CardContent>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="flex items-start gap-2.5 mb-7 last:mb-0">
            <Skeleton className="size-9 rounded-full shrink-0" />
            <div className="flex flex-col gap-2 grow">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-full max-w-md" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export { ExperienceSkeleton };
