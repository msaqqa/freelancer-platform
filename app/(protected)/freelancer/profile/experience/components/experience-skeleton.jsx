'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Loading placeholder for the experience list. Mirrors the ExperienceCard layout.
function ExperienceSkeleton({ count = 3 }) {
  return (
    <div className="flex flex-col gap-5 lg:gap-7.5">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index}>
          <CardContent className="flex flex-col gap-2.5 p-5">
            <div className="flex items-start justify-between gap-2.5">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
            <div className="flex items-center gap-2.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full max-w-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export { ExperienceSkeleton };
