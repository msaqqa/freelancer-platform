'use client';

import { ActivitiesDesignerWelcome } from '@/partials/activities/designer-welcome';
import { Card, CardContent } from '@/components/ui/card';

export function ProfileActivityContent() {
  return (
    <Card>
      <CardContent>
        <ActivitiesDesignerWelcome />
        <ActivitiesDesignerWelcome />
        <ActivitiesDesignerWelcome />
      </CardContent>
    </Card>
  );
}
