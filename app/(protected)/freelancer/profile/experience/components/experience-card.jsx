'use client';

import { Pencil } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// "MM-YYYY" -> "MM/YYYY" (locale-neutral).
const fmt = (date) => (date ? date.replace('-', '/') : '');

const ExperienceCard = ({ item, onEdit }) => {
  const { t } = useTranslation('freelancerExperience');

  const meta = [item.company, item.location].filter(Boolean).join(' · ');
  const range = `${fmt(item.start_date)} - ${
    item.end_date ? fmt(item.end_date) : t('present')
  }`;

  return (
    <Card>
      <CardContent className="flex flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold text-mono">
              {item.title}
            </span>
            {meta && (
              <span className="text-sm text-secondary-foreground">{meta}</span>
            )}
          </div>
          <Button variant="ghost" onClick={onEdit}>
            <Pencil size={16} className="text-accent-foreground" /> {t('edit')}
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs text-secondary-foreground">{range}</span>
          {item.type && (
            <Badge variant="secondary" size="sm">
              {t(`types.${item.type}`)}
            </Badge>
          )}
        </div>

        {item.description && (
          <p className="text-sm text-foreground mt-1">{item.description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export { ExperienceCard };
